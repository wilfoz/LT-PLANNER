import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ListConstructionComponent } from './list/list-construction.composition';
import { ListConstructionRoutingModule } from './list-construction.routing.module';
import { ListConstructionFormComponent } from './form/list-construction-form.component';
import { ListConstructionDialogComponent } from './dialog/list-construction-dialog.component';
import { ListConstructionService } from './service/list-construction.service';

@NgModule({
  declarations: [
    ListConstructionComponent,
    ListConstructionFormComponent,
    ListConstructionDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ListConstructionRoutingModule
  ],
  exports: [
    SharedModule,
  ], entryComponents: [
    ListConstructionDialogComponent
  ],
  providers: [
    ListConstructionService
  ]
})
export class ListConstructionModule { }
