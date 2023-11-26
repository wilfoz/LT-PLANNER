import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/components/service/base-service-resource';
import { environment } from 'src/environments/environment';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseResourceService<Task> {

  constructor(
    protected override injector: Injector,
  ) {
    super(`${environment.BASE_URL}/task`, injector, Task.fromJson);
  }

}
