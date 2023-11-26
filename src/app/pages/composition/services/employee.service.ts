import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/components/service/base-service-resource';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { TeamService } from './team.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseResourceService<Employee> {

  constructor(
    protected override injector: Injector,
  ) {
    super(`${environment.BASE_URL}/employee`, injector, Employee.fromJson);
  }

}
