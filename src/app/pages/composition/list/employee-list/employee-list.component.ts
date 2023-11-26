import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { BaseResourceListComponent } from '../../../../shared/components/base-resource-list/base-resource-list.component';
import { EmployeeDialogComponent } from '../../dialog/employee-dialog/employee-dialog.component';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent extends BaseResourceListComponent<Employee> {
  displayedColumns: string[] = [
    'id',
    'registration',
    'name',
    'occupation',
    'base_salary',
    'status',
    'update',
    'delete',
  ];

  constructor(
    protected override injector: Injector,
    private employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog
  ) {
    super(injector, employeeService);
  }

  edit(element: any) {
    const { id } = element;
    this.employeeService.getById(id)
    .pipe(
      take(1)
    )
    .subscribe({
      next: (data: Employee) => {
        const dialogConfig = this.setConfigDialog();
        dialogConfig.data = data;
        const dialogRef = this.dialog.open(EmployeeDialogComponent, dialogConfig)
        dialogRef.afterClosed()
        .subscribe({
          next: () => this.redirectTo('composition/employee')
        });
      }
    })
  }

  add() {
    const dialogConfig = this.setConfigDialog();
    this.dialog.open(EmployeeDialogComponent, dialogConfig);
  }

  dataFromUploadExcel(data: any[]) {
    data.map((employee: Employee) => {
      this.employeeService.create(employee);
    });

    const currentUrl = this.router.url;
    this.redirectTo(currentUrl);
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
