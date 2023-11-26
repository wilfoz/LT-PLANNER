import { OnInit, Directive, ViewChild, Injector } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { tap, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseResourceModel } from '../model/base-resource.model';

import { BaseResourceService } from '../service/base-service-resource';

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel>
  implements OnInit
{
  componentDestroyed$: Subject<boolean> = new Subject();

  resources = new MatTableDataSource();
  snackBar!: MatSnackBar;
  isLoading = false;

  // MatPaginator
  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 15];
  showFirstLastButtons = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    protected injector: Injector,
    private resourceService: BaseResourceService<T>
  ) {
    this.snackBar = this.injector.get(MatSnackBar);
  }

  ngOnInit() {
    this.isLoading = true;
    this.getAllResources();
  }

  ngAfterViewInit() {
    this.resources.sort = this.sort;
    this.resources.paginator = this.paginator;
  }

  getAllResources() {
    this.isLoading = false;
    return this.resourceService
      .getAll({ page: this.pageIndex, totalPerPage: 300 })
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        next: (data) => (this.resources.data = data),
        error: (error) => console.log(error),
      });
  }

  handlePageEvent(event: PageEvent) {
    this.isLoading = true;
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAllResources();
  }

  deleteResource(resource: T) {
    this.isLoading = true;
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      const id: any = resource.id;
      this.resourceService.delete(id);
      this.resourceService.resource$.subscribe(
        (res) => (this.resources.data = res)
      );
      this.isLoading = false;
      this.notify('deletado com sucesso!');
    }

    this.isLoading = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.resources.filter = filterValue.trim().toLowerCase();

    if (this.resources.paginator) {
      this.resources.paginator.firstPage();
    }
  }

  protected notify(msg: string) {
    this.snackBar.open(msg, 'OK', { duration: 3000 });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
