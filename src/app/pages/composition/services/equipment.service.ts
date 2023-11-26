import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/components/service/base-service-resource';
import { environment } from 'src/environments/environment';
import { Equipment } from '../models/equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService extends BaseResourceService<Equipment> {

  constructor(
    protected override injector: Injector,
  ) {
    super(`${environment.BASE_URL}/equipment`, injector, Equipment.fromJson);
  }

}
