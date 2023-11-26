import { Component, Injector } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { BaseResourceListComponent } from '../../../../shared/components/base-resource-list/base-resource-list.component';
import { EquipmentDialogComponent } from '../../dialog/equipment-dialog/equipment-dialog.component';
import { Equipment } from '../../models/equipment';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css'],
})
export class EquipmentListComponent extends BaseResourceListComponent<Equipment> {
  displayedColumns: string[] = [
    'id',
    'model',
    'manufacturer',
    'license_plate',
    'provider',
    'cost',
    'status',
    'update',
    'delete',
  ];

  constructor(
    protected override injector: Injector,
    private equipmentService: EquipmentService,
    private router: Router,
    private dialog: MatDialog
  ) {
    super(injector, equipmentService);
  }

  edit(element: any) {
    const { id } = element;
    this.equipmentService.getById(id)
    .pipe(
      take(1)
    )
    .subscribe({
      next: (data: Equipment) => {
        const dialogConfig = this.setConfigDialog();
        dialogConfig.data = data;
        const dialogRef = this.dialog.open(EquipmentDialogComponent, dialogConfig)
        dialogRef.afterClosed()
        .subscribe({
          next: () => this.redirectTo('composition/equipment')
        });
      }
    })
  }

  add() {
    const dialogConfig = this.setConfigDialog();
    this.dialog.open(EquipmentDialogComponent, dialogConfig);
  }

  dataFromUploadExcel(data: any[]) {
    data.map((equipment: Equipment) => {
      this.equipmentService.create(equipment);
    });

    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  private setConfigDialog = () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = 'auto';
    dialogConfig.width = '600px';
    return dialogConfig;
  }

  private redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
    this.router.navigate([uri]));
  }

}
