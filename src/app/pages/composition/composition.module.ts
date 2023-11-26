import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CompositionRoutingModule } from './composition.routing.module';

import { EmployeeDialogComponent } from './dialog/employee-dialog/employee-dialog.component';
import { EquipmentDialogComponent } from './dialog/equipment-dialog/equipment-dialog.component';
import { TeamDialogComponent } from './dialog/team-dialog/team-dialog.component';

import { CompositionFormModule } from './form/composition-form.module';
import { EquipmentListComponent } from './list/equipment-list/equipment-list.component';
import { EmployeeListComponent } from './list/employee-list/employee-list.component';
import { TeamListComponent } from './list/team-list/team-list.component';
import { CompositionComponent } from './composition.component';

@NgModule({
  declarations: [
    CompositionComponent,
    EquipmentListComponent,
    EmployeeListComponent,
    TeamListComponent,
  ],
  imports: [
    CommonModule,
    CompositionRoutingModule,
    CompositionFormModule,
    SharedModule,
  ],
  exports: [
    SharedModule,
  ], entryComponents: [
    EmployeeDialogComponent,
    EquipmentDialogComponent,
    TeamDialogComponent
  ]
})
export class CompositionModule { }
