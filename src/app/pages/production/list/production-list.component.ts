import { Component, Injector } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { BaseResourceListComponent } from "src/app/shared/components/base-resource-list/base-resource-list.component";
import { ProductionDialogComponent } from "../dialog/production-dialog.component";
import { Production } from '../model/production';
import { ProductionService } from '../service/production.service';

@Component({
  selector: 'app-production-list',
  templateUrl: './production-list.component.html',
  styleUrls: ['./production-list.component.css'],
})
export class ProductionListComponent extends BaseResourceListComponent<Production> {
  displayedColumns: string[] = [
    'id',
    'status',
    'task',
    'tower',
    'team',
    'productionDate',
    'startTimeOfDay',
    'endTimeOfDay',
    'update',
    'delete',
  ];

  constructor(
    protected override injector: Injector,
    private productionService: ProductionService,
    private router: Router,
    private dialog: MatDialog
  ) {
    super(injector, productionService);
  }

  edit(element: any) {
    const { id } = element;
    this.productionService.getById(id)
    .pipe(
      take(1)
    )
    .subscribe({
      next: (data: Production) => {
        const dialogConfig = this.setConfigDialog();
        dialogConfig.data = data;
        const dialogRef = this.dialog.open(ProductionDialogComponent, dialogConfig)
        dialogRef.afterClosed()
        .subscribe({
          next: () => this.redirectTo('production')
        });
      }
    })
  }

  add() {
    const dialogConfig = this.setConfigDialog();
    const dialogRef = this.dialog.open(ProductionDialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe({
        next: () => this.redirectTo('production')
    });
  }

  dataFromUploadExcel(data: Production[]) {
    data.map((list: Production) => {
      this.productionService.create(list);
    });

    const currentUrl = this.router.url;
    this.notify('Production uploaded successfully')
    this.redirectTo(currentUrl);
  }

  private setConfigDialog = () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = 'auto';
    dialogConfig.width = '50%';
    return dialogConfig;
  }

  private redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
    this.router.navigate([uri]));
  }

}
