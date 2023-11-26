import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/components/service/base-service-resource';
import { environment } from 'src/environments/environment';
import { Production } from '../model/production';

@Injectable({
  providedIn: 'root'
})
export class ProductionService extends BaseResourceService<Production> {

  constructor(
    protected override injector: Injector,
  ) {
    super(`${environment.BASE_URL}/production`, injector, Production.fromJson);
  }

}
