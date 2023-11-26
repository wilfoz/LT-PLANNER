import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseFormsResourceComponent } from 'src/app/shared/components/base-forms-resource/base-forms-resource';
import { STAGE, UNITY } from 'src/app/shared/utils/enum';
import { Task } from '../model/task';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent extends BaseFormsResourceComponent<Task> implements OnInit {

  buttonText: string = 'Save';

  @Input() dialog!: any;
  @Input() action!: string;
  @Input() task!: Task;

  stages: STAGE[] = [STAGE.PRELIMINAR, STAGE.CIVIL, STAGE.MONTAGEM, STAGE.LANCAMENTO, STAGE.COMISSIONAMENTO];
  units: UNITY[] = [UNITY.KM, UNITY.TORRE, UNITY.UNIDADE];

  constructor(
    protected taskService: TaskService,
    protected override injector: Injector,
  ) {
    super(injector, new Task(), taskService, Task.fromJson);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.isLoadedResource();
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      group: [null, [Validators.required]],
      unity: [null, [Validators.required]],
      total: [null, [Validators.required]],
      is_mapped: [null],
      stage: [null, [Validators.required]],
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.resourceForm.controls[controlName].hasError(errorName);
  }

  submitForm() {
    if (this.currentAction == 'new') {
      this.createResource();
    } else {
      const { id } = this.task;
      if (id) {
        this.updateResource(id);
      }
    }
    this.closeDialog();
  }

  private isLoadedResource() {
    if (!this.task) {
      this.currentAction = 'new';
      this.buttonText = 'Save';
    } else {
      this.resourceForm.patchValue(this.task);
      this.currentAction = 'edit';
      this.buttonText = 'Update';
    }
  }

  private closeDialog() {
    if (this.dialog) this.dialog.close(null);
  }

}
