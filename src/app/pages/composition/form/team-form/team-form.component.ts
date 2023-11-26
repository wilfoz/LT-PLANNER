import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseFormsResourceComponent } from 'src/app/shared/components/base-forms-resource/base-forms-resource';
import { Team } from '../../models/team';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent extends BaseFormsResourceComponent<Team> implements OnInit {

  buttonText: string = 'Save';

  @Input() dialog!: any;
  @Input() action!: string;
  @Input() team!: Team;

  constructor(
    protected teamService: TeamService,
    protected override injector: Injector,
  ) {
    super(injector, new Team(), teamService, Team.fromJson);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.isLoadedResource();
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      tooling_cost: [null, [Validators.required]],
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.resourceForm.controls[controlName].hasError(errorName);
  }

  submitForm() {
    if (this.currentAction == 'new') {
      this.createResource();
    } else {
      const { id } = this.team;
      if (id) {
        this.updateResource(id);
      }
    }
    this.closeDialog();
  }

  private isLoadedResource() {
    if (!this.team) {
      this.currentAction = 'new';
      this.buttonText = 'Save';
    } else {
      this.resourceForm.patchValue(this.team);
      this.currentAction = 'edit';
      this.buttonText = 'Update';
    }
  }

  private closeDialog() {
    if (this.dialog) this.dialog.close(null);
  }

}
