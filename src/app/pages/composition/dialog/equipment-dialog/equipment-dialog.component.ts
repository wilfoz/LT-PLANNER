import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Equipment } from '../../models/equipment';

@Component({
  selector: 'app-equipment-dialog',
  templateUrl: './equipment-dialog.component.html',
  styleUrls: []
})
export class EquipmentDialogComponent implements OnInit {
  title: string = 'Edit';
  dialog: MatDialogRef<EquipmentDialogComponent>;

  constructor(
    private dialogRef: MatDialogRef<EquipmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public equipment: Equipment
  ) {
    this.dialog = dialogRef;
  }

  ngOnInit(): void { }

  close() {
    this.dialogRef.close(null);
  }

}
