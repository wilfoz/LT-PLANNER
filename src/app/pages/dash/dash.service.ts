import { Injectable } from '@angular/core';
import { ProductionService } from '../production/service/production.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ListConstructionService } from '../list-construction/service/list-construction.service';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { ListConstruction } from '../list-construction/model/list-construction';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  private subject = new BehaviorSubject([]);
  list$: Observable<any[]> = this.subject.asObservable();

  constructor(
    private productionService: ProductionService,
    private listConstructionService: ListConstructionService
  ) {
    this.getTowers();
  }

  getProduction() {
    let productions = this.productionService.resource$;
    return productions;
  }

  private getTowers(): void {
    this.listConstructionService
      .getAll({ page: 0, totalPerPage: 400 })
      .subscribe((data) => this.subject.next(data));
  }

  civilPercentageAdvance() {}
  assemblyPercentageAdvance() {}
  launchPercentageAdvance() {}
  commissionPercentageAdvance() {}

  totalEstimatedKms(): Observable<number> {
    return this.list$.pipe(
      map((data) => data.reduce((acc, curr) => acc + curr['forward'] / 1000, 0))
    );
  }

  totalEstimatedTowers(): Observable<number> {
    return this.list$.pipe(map((data) => data.length));
  }
}
