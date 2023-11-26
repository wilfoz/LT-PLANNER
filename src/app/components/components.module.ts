import { NgModule } from "@angular/core";
import { CardComponent } from "./card/card.component";
import { MapComponent } from "./map/map.component";
import { MaterialModule } from '../shared/material.module';
import { BarChartComponent } from "./charts/bar-chart/bar-chart.component";
import { LineChartComponent } from "./charts/line-chart/line-chart.component";
import { PieChartComponent } from "./charts/pie-chart/pie-chart.component";
import { NgChartsModule } from 'ng2-charts';
import { MapService } from './map/map.service';

@NgModule({
  declarations: [
    MapComponent,
    CardComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent
  ],
  imports: [
    MaterialModule,
    NgChartsModule
    // NgxMapboxGLModule.withConfig({
    //   accessToken: environment.mapbox.accessToken, // Optional, can also be set per map (accessToken input of mgl-map)
    // })
  ],
  exports: [
    MapComponent,
    CardComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent
  ],
  providers: [MapService]
})
export class ComponentsModule { }
