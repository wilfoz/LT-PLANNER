import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/components/service/base-service-resource';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseResourceService<Team> {

  constructor(protected override injector: Injector) {
    super(`${environment.BASE_URL}/team`, injector, Team.fromJson);
  }
}
