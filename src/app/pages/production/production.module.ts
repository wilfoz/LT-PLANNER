import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ProductionFormComponent } from './form/production-form.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ProductionDialogComponent } from './dialog/production-dialog.component';
import { ProductionService } from './service/production.service';
import { ProductionListComponent } from './list/production-list.component';
import { ProductionRoutingModule } from './production.routing.module';

@NgModule({
  declarations: [
    ProductionFormComponent,
    ProductionDialogComponent,
    ProductionListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductionRoutingModule,
    NgxMaterialTimepickerModule.setLocale('pt-BR')
  ],
  exports: [
    SharedModule,
  ], entryComponents: [
    ProductionDialogComponent
  ],
  providers: [
    ProductionService
  ]
})
export class ProductionModule { }
