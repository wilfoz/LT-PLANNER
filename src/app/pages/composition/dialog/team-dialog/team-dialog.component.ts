import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Equipment } from '../../models/equipment';
import { Team } from '../../models/team';

@Component({
  selector: 'app-team-dialog',
  templateUrl: './team-dialog.component.html',
  styleUrls: []
})
export class TeamDialogComponent implements OnInit {
  title: string = 'Edit';
  dialog: MatDialogRef<TeamDialogComponent>;

  constructor(
    private dialogRef: MatDialogRef<TeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public team: Team
  ) {
    this.dialog = dialogRef;
  }

  ngOnInit(): void { }

  close() {
    this.dialogRef.close(null);
  }

}
