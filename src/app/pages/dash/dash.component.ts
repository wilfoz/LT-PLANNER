import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DashService } from './dash.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
})
export class DashComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  headersCards = ['Civil', 'Montagem', 'Lançamento', 'Comissionamento'];

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 4,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dashService: DashService
  ) {}

  ngOnInit(): void {
    this.dashService
      .totalEstimatedKms()
      .subscribe((data) => console.log('total de km: ', data));
    this.dashService
      .totalEstimatedTowers()
      .subscribe((data) => console.log('total de torres: ', data));
  }
}
