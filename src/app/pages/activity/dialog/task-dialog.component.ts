import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../model/task';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: []
})
export class TaskDialogComponent implements OnInit {
  title: string = 'Edit';
  dialog: MatDialogRef<TaskDialogComponent>;

  constructor(
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task
  ) {
    this.dialog = dialogRef;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(null);
  }

}
