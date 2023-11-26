import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { BaseResourceListComponent } from '../../../../shared/components/base-resource-list/base-resource-list.component';
import { TeamDialogComponent } from '../../dialog/team-dialog/team-dialog.component';
import { Team } from '../../models/team';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css'],
})
export class TeamListComponent extends BaseResourceListComponent<Team> {
  displayedColumns: string[] = [
    'id',
    'name',
    'tooling_cost',
    'update',
    'delete',
  ];

  constructor(
    protected override injector: Injector,
    private teamService: TeamService,
    private router: Router,
    private dialog: MatDialog
  ) {
    super(injector, teamService);
  }

  edit(element: any) {
    const { id } = element;
    this.teamService.getById(id)
    .pipe(
      take(1)
    )
    .subscribe({
      next: (data: Team) => {
        const dialogConfig = this.setConfigDialog();
        dialogConfig.data = data;
        const dialogRef = this.dialog.open(TeamDialogComponent, dialogConfig)
        dialogRef.afterClosed()
        .subscribe({
          next: () => this.redirectTo('composition/team')
        });
      }
    })
  }

  add() {
    const dialogConfig = this.setConfigDialog();
    this.dialog.open(TeamDialogComponent, dialogConfig);
  }

  dataFromEventEmitter(data: any[]) {
    data.map((team: Team) => {
      this.teamService.create(team);
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
