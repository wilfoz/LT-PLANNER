import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Production } from '../model/production';

@Component({
  selector: 'app-production-dialog',
  templateUrl: './production-dialog.component.html',
  styleUrls: []
})
export class ProductionDialogComponent implements OnInit {
  title: string = 'Edit';
  dialog: MatDialogRef<ProductionDialogComponent>;

  constructor(
    private dialogRef: MatDialogRef<ProductionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public production: Production
  ) {
    this.dialog = dialogRef;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(null);
  }

}
