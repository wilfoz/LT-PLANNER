import { Component, Inject, Input, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: []
})
export class EmployeeDialogComponent implements OnInit {
  title: string = 'Edit';
  dialog: MatDialogRef<EmployeeDialogComponent>;

  constructor(
    private dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public employee: Employee
  ) {
    this.dialog = dialogRef;
  }

  ngOnInit(): void { }

  close() {
    this.dialogRef.close(null);
  }

}
