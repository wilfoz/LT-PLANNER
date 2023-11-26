import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductionListComponent } from './list/production-list.component';

const routes: Routes = [
  {path: '', component: ProductionListComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProductionRoutingModule { }
