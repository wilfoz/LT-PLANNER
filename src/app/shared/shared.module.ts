import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DirectivesModule } from "../directives/directives.module";
import { MaterialModule } from "./material.module";

@NgModule({
  declarations: [],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule,
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule,
  ],
  providers: [
  ]
})
export class SharedModule { }
