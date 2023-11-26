import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompositionFormComponent } from './form/composition-form.component';
import { EmployeeListComponent } from './list/employee-list/employee-list.component';
import { EquipmentListComponent } from './list/equipment-list/equipment-list.component';
import { TeamListComponent } from "./list/team-list/team-list.component";
import { EquipmentFormComponent } from './form/equipment-form/equipment-form.component';
import { TeamFormComponent } from "./form/team-form/team-form.component";
import { EmployeeFormComponent } from "./form/employee-form/employee-form.component";
import { CompositionComponent } from './composition.component';

const routes: Routes = [
  {
    path: '',
    component: CompositionComponent,
    children: [
      {path: 'new', component: CompositionFormComponent},

      {path: 'team', component: TeamListComponent},
      {path: 'team/new', component: TeamFormComponent},

      {path: 'equipment', component: EquipmentListComponent},
      {path: 'equipment/new', component: EquipmentFormComponent},

      {path: 'employee', component: EmployeeListComponent},
      {path: 'employee/new', component: EmployeeFormComponent},
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CompositionRoutingModule { }
