import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseFormsResourceComponent } from 'src/app/shared/components/base-forms-resource/base-forms-resource';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { Observable } from 'rxjs';
import { Team } from '../../models/team';
import { TeamService } from '../../services/team.service';
import { LEADERSHIP, STATUS_EMPLOYEE } from 'src/app/shared/utils/enum';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent extends BaseFormsResourceComponent<Employee> implements OnInit {

  buttonText: string = 'Save';

  @Input() dialog!: any;
  @Input() action!: string;
  @Input() employee!: Employee;

  teams$!: Observable<Team[]>;
  status: STATUS_EMPLOYEE[] = [STATUS_EMPLOYEE.AFASTADO, STATUS_EMPLOYEE.ATIVO, STATUS_EMPLOYEE.TREINAMENTO];
  leaders: LEADERSHIP[] = [LEADERSHIP.NAO, LEADERSHIP.SIM];

  constructor(
    protected employeeService: EmployeeService,
    protected override injector: Injector,
    private teamService: TeamService,
  ) {
    super(injector, new Employee(), employeeService, Employee.fromJson);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.teams$ = this.teamService.resource$;
    this.isLoadedResource();
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      registration: [null, [Validators.required]],
      name: [null, [Validators.required, Validators.minLength(6)]],
      occupation: [null, [Validators.required]],
      leadership: [null, [Validators.required]],
      base_salary: [null, [Validators.required]],
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
      const { id } = this.employee;
      if (id) {
        this.updateResource(id);
      }
    }
    this.closeDialog();
  }

  private isLoadedResource() {
    if (!this.employee) {
      this.currentAction = 'new';
      this.buttonText = 'Save';
    } else {
      this.resourceForm.patchValue(this.handleDataEmployee(this.employee));
      this.currentAction = 'edit';
      this.buttonText = 'Update';
    }
  }

  private closeDialog() {
    if (this.dialog) this.dialog.close(null);
  }

  private handleDataEmployee (data: any) {
    let employee = {
      ...data,
      team: data.team['name']
    }
    return employee
  }

}
