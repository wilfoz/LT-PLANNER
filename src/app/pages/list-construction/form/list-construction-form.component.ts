import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseFormsResourceComponent } from 'src/app/shared/components/base-forms-resource/base-forms-resource';
import { EMBARGOES } from 'src/app/shared/utils/enum';
import { ListConstruction } from '../model/list-construction';
import { ListConstructionService } from '../service/list-construction.service';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-construction-form.component.html',
  styleUrls: ['./list-construction-form.component.css']
})
export class ListConstructionFormComponent extends BaseFormsResourceComponent<ListConstruction> implements OnInit {

  buttonText: string = 'Save';

  @Input() dialog!: any;
  @Input() action!: string;
  @Input() list!: ListConstruction;

  embargoes: EMBARGOES[] = [EMBARGOES.LIBERADO, EMBARGOES.FUNDIARIO, EMBARGOES.PROJETO, EMBARGOES.ARQUEOLOGIA];

  constructor(
    protected listConstructionService: ListConstructionService,
    protected override injector: Injector,
  ) {
    super(injector, new ListConstruction(), listConstructionService, ListConstruction.fromJson);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.isLoadedResource();
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      tower: [null, [Validators.required]],
      type: [null, [Validators.required]],
      locality: [null, [Validators.required]],
      coordinates: [null, [Validators.required]],
      forward: [null, [Validators.required]],
      height: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      excavation_volume: [null],
      concrete_volume: [null],
      backfill_volume: [null],
      steel_volume: [null],
      type_of_foundation_A: [null],
      type_of_foundation_B: [null],
      type_of_foundation_C: [null],
      type_of_foundation_D: [null],
      type_of_foundation_MC: [null],
      embargo: [null, [Validators.required]]
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.resourceForm.controls[controlName].hasError(errorName);
  }

  submitForm() {
    if (this.currentAction == 'new') {
      this.createResource();
    } else {
      const { id } = this.list;
      if (id) {
        this.updateResource(id);
      }
    }
    this.closeDialog();
  }

  private isLoadedResource() {
    if (!this.list) {
      this.currentAction = 'new';
      this.buttonText = 'Save';
    } else {
      this.resourceForm.patchValue(this.list);
      this.currentAction = 'edit';
      this.buttonText = 'Update';
    }
  }

  private closeDialog() {
    if (this.dialog) this.dialog.close(null);
  }

}
