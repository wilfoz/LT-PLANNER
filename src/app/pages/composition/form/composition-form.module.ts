import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { CompositionFormComponent } from './composition-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamFormComponent } from './team-form/team-form.component';
import { EmployeeDialogComponent } from '../dialog/employee-dialog/employee-dialog.component';
import { EquipmentDialogComponent } from '../dialog/equipment-dialog/equipment-dialog.component';
import { TeamDialogComponent } from '../dialog/team-dialog/team-dialog.component';

@NgModule({
  declarations: [
    EmployeeFormComponent,
    EquipmentFormComponent,
    TeamFormComponent,
    CompositionFormComponent,
    EmployeeDialogComponent,
    EquipmentDialogComponent,
    TeamDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CompositionFormModule { }
