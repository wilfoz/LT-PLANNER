import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TaskListComponent } from './list/task-list.component';

const routes: Routes = [
  {path: '', component: TaskListComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TaskRoutingModule { }
