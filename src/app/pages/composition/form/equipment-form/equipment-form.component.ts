import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseFormsResourceComponent } from 'src/app/shared/components/base-forms-resource/base-forms-resource';
import { Employee } from '../../models/employee';
import { Observable, switchMap } from 'rxjs';
import { Team } from '../../models/team';
import { TeamService } from '../../services/team.service';
import { Equipment } from '../../models/equipment';
import { EquipmentService } from '../../services/equipment.service';
import { STATUS_EQUIPMENT } from 'src/app/shared/utils/enum';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css']
})
export class EquipmentFormComponent extends BaseFormsResourceComponent<Equipment> implements OnInit {

  buttonText: string = 'Save';

  @Input() dialog!: any;
  @Input() action!: string;
  @Input() equipment!: Equipment;

  teams$!: Observable<Team[]>;
  status: STATUS_EQUIPMENT[] = [STATUS_EQUIPMENT.ATIVO, STATUS_EQUIPMENT.MANUTENCAO];

  constructor(
    protected equipmentService: EquipmentService,
    protected override injector: Injector,
    private teamService: TeamService,
  ) {
    super(injector, new Equipment(), equipmentService, Equipment.fromJson);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.teams$ = this.teamService.resource$;
    this.isLoadedResource();
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      model: [null, [Validators.required]],
      manufacturer: [null, [Validators.required]],
      license_plate: [null, [Validators.required]],
      provider: [null, [Validators.required]],
      cost: [null, [Validators.required]],
      status: [null, [Validators.required]],
      team: [null]
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.resourceForm.controls[controlName].hasError(errorName);
  }

  submitForm() {
    if (this.currentAction == 'new') {
      this.createResource();
    } else {
      const { id } = this.equipment;
      if (id) {
        this.updateResource(id);
      }
    }
    this.closeDialog();
  }

  private isLoadedResource() {
    if (!this.equipment) {
      this.currentAction = 'new';
      this.buttonText = 'Save';
    } else {
      this.resourceForm.patchValue(this.handleDataEquipment(this.equipment));
      this.currentAction = 'edit';
      this.buttonText = 'Update';
    }
  }

  private closeDialog() {
    if (this.dialog) this.dialog.close(null);
  }

  private handleDataEquipment(data: any) {
    let equipment = {
      ...data,
      team: data.team['name']
    }
    return equipment
  }
}
