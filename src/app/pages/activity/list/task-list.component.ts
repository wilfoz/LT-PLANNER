import { Component, Injector } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { take, tap } from 'rxjs';
import { BaseResourceListComponent } from "src/app/shared/components/base-resource-list/base-resource-list.component";
import { Task } from '../model/task';
import { TaskService } from '../service/task.service';
import { TaskDialogComponent } from '../dialog/task-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent extends BaseResourceListComponent<Task> {
  displayedColumns: string[] = [
    'id',
    'code',
    'group',
    'name',
    'unity',
    'total',
    'stage',
    'update',
    'delete',
  ];

  constructor(
    protected override injector: Injector,
    private taskService: TaskService,
    private router: Router,
    private dialog: MatDialog
  ) {
    super(injector, taskService);
  }

  edit(element: any) {
    const { id } = element;
    this.taskService.getById(id)
    .pipe(
      take(1)
    )
    .subscribe({
      next: (data: Task) => {
        const dialogConfig = this.setConfigDialog();
        dialogConfig.data = data;
        const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig)
        dialogRef.afterClosed()
        .subscribe({
          next: () => this.redirectTo('activity')
        });
      }
    })
  }

  add() {
    const dialogConfig = this.setConfigDialog();
    this.dialog.open(TaskDialogComponent, dialogConfig);
  }

  dataFromEventEmitter(data: Task[]) {
    console.log('result', data)
    data.map((list: Task) => {
      this.taskService.create(list);
    });

    const currentUrl = this.router.url;
    this.notify('Task uploaded successfully')
    this.redirectTo(currentUrl);
  }

  private setConfigDialog = () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    return dialogConfig;
  }

  private redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
    this.router.navigate([uri]));
  }

}
