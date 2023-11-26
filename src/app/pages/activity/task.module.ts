import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TaskRoutingModule } from './task.routing.module';
import { TaskService } from './service/task.service';
import { TaskListComponent } from './list/task-list.component';
import { TaskFormComponent } from './form/task-form.component';
import { TaskDialogComponent } from './dialog/task-dialog.component';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent,
    TaskDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TaskRoutingModule
  ],
  exports: [
    SharedModule,
  ],
  entryComponents: [
    TaskDialogComponent
  ],
  providers: [TaskService]
})
export class ActivityModule { }
