import { BaseFormsResourceComponent } from 'src/app/shared/components/base-forms-resource/base-forms-resource';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { TeamService } from '../../composition/services/team.service';
import { TaskService } from '../../activity/service/task.service';
import { ProductionService } from '../service/production.service';
import { ListConstructionService } from '../../list-construction/service/list-construction.service';

import { Team } from '../../composition/models/team';
import { Task } from '../../activity/model/task';
import { Production } from '../model/production';
import { ListConstruction } from '../../list-construction/model/list-construction';
import { STATUS, WEATHER } from 'src/app/shared/utils/enum';

@Component({
  selector: 'app-production-form',
  templateUrl: './production-form.component.html',
  styleUrls: ['./production-form.component.css']
})
export class ProductionFormComponent extends BaseFormsResourceComponent<Production> implements OnInit {

  buttonText: string = 'Save';

  @Input() dialog!: any;
  @Input() action!: string;
  @Input() production!: Production;

  tasks$!: Observable<Task[]>;
  towers$!: Observable<ListConstruction[]>;
  teams$!: Observable<Team[]>;
  status: STATUS[] = [STATUS.ANDAMENTO, STATUS.EXECUTADO, STATUS.PROGRAMADO];
  weather: WEATHER[] = [WEATHER.BOM, WEATHER.CHUVA, WEATHER.IMPRATICAVEL]

  constructor(
    protected productionService: ProductionService,
    protected override injector: Injector,
    private teamService: TeamService,
    private listConstructionService: ListConstructionService,
    private taskService: TaskService
  ) {
    super(injector, new Production(), productionService, Production.fromJson);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.tasks$ = this.taskService.resource$;
    this.towers$ = this.listConstructionService.resource$;
    this.teams$ = this.teamService.resource$;
    this.isLoadedResource();
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      status: [null, [Validators.required]],
      task: [null, [Validators.required]],
      tower: [null, [Validators.required]],
      team: [null, [Validators.required]],
      productionDate: [null],
      startTimeOfDay: [null],
      endTimeOfDay: [null],
      weather: [null, [Validators.required]],
      comments: [null],
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.resourceForm.controls[controlName].hasError(errorName);
  }

  submitForm() {
    if (this.currentAction == 'new') {
      this.createResource();
    } else {
      const { id } = this.production;
      if (id) {
        this.updateResource(id);
      }
    }
    this.closeDialog();
  }

  private isLoadedResource() {
    if (!this.production) {
      this.currentAction = 'new';
      this.buttonText = 'Save';
    } else {
      this.resourceForm.patchValue(this.handleDataProduction(this.production));
      this.currentAction = 'edit';
      this.buttonText = 'Update';
    }
  }

  private closeDialog() {
    if (this.dialog) this.dialog.close(null);
  }

  private handleDataProduction(data: any) {
    let production = {
      ...data,
      task: data.task['name'],
      tower: data.tower['tower'],
      team: data.team['name'],
    }
    return production
  }
}
