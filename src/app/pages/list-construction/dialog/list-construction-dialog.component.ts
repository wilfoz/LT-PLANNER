import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListConstruction } from '../model/list-construction';

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-construction-dialog.component.html',
  styleUrls: []
})
export class ListConstructionDialogComponent implements OnInit {
  title: string = 'Edit';
  dialog: MatDialogRef<ListConstructionDialogComponent>;

  constructor(
    private dialogRef: MatDialogRef<ListConstructionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public list: ListConstruction
  ) {
    this.dialog = dialogRef;
  }

  ngOnInit(): void { }

  close() {
    this.dialogRef.close(null);
  }

}
