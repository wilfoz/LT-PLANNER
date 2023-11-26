import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListConstructionComponent } from "./list/list-construction.composition";

const routes: Routes = [
  {path: '', component: ListConstructionComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ListConstructionRoutingModule { }
