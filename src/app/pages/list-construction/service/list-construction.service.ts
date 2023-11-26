import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/components/service/base-service-resource';
import { environment } from 'src/environments/environment';
import { ListConstruction } from '../model/list-construction';

@Injectable({
  providedIn: 'root',
})
export class ListConstructionService extends BaseResourceService<ListConstruction> {
  constructor(protected override injector: Injector) {
    super(`${environment.BASE_URL}/tower`, injector, ListConstruction.fromJson);
  }
}
