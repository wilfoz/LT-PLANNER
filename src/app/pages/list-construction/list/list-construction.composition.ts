import { Component, Injector } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ListConstructionDialogComponent } from '../dialog/list-construction-dialog.component';
import { ListConstruction } from '../model/list-construction';
import { ListConstructionService } from '../service/list-construction.service';

@Component({
  selector: 'app-list-construction-list',
  templateUrl: './list-construction.composition.html',
  styleUrls: ['./list-construction.composition.css'],
})
export class ListConstructionComponent extends BaseResourceListComponent<ListConstruction> {
  displayedColumns: string[] = [
    'id',
    'tower',
    'type',
    'locality',
    'coordinates',
    'forward',
    'height',
    'weight',
    'excavation_volume',
    'concrete_volume',
    'backfill_volume',
    'steel_volume',
    'embargo',
    'update',
    'delete',
  ];

  constructor(
    protected override injector: Injector,
    private listConstructionService: ListConstructionService,
    private router: Router,
    private dialog: MatDialog
  ) {
    super(injector, listConstructionService);
  }

  edit(element: any) {
    const { id } = element;
    this.listConstructionService
      .getById(id)
      .pipe(take(1))
      .subscribe({
        next: (data: ListConstruction) => {
          const dialogConfig = this.setConfigDialog();
          dialogConfig.data = data;
          const dialogRef = this.dialog.open(
            ListConstructionDialogComponent,
            dialogConfig
          );
          dialogRef.afterClosed().subscribe({
            next: () => this.redirectTo('list-construction'),
          });
        },
      });
  }

  add() {
    const dialogConfig = this.setConfigDialog();
    this.dialog.open(ListConstructionDialogComponent, dialogConfig);
  }

  dataFromEventEmitter(data: ListConstruction[]) {
    data.map((list: ListConstruction) => {
      this.listConstructionService.create(list);
    });

    const currentUrl = this.router.url;
    this.notify('List uploaded successfully');
    this.redirectTo(currentUrl);
  }

  private setConfigDialog = () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = 'auto';
    dialogConfig.width = '600px';
    return dialogConfig;
  };

  private redirectTo(uri: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: false })
      .then(() => this.router.navigate([uri]));
  }
}
