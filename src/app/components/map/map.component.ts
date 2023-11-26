import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
  map!: mapboxgl.Map;
  data!: any[];
  style = 'mapbox://styles/mapbox/streets-v11';

  lat = -11.183071;
  lng = -38.000172;

  constructor(private mapService: MapService) {}
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.data = this.mapService.getAll();
    mapboxgl as typeof mapboxgl;
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 8,
      center: [this.lng, this.lat],
    });

    this.handleMarkers();
  }

  handleMarkers() {
    new mapboxgl.Marker({ color: 'red', rotation: 45 })
      .setLngLat([-37.99725816759531, -11.182563712964914])
      .addTo(this.map);

    new mapboxgl.Marker({ color: 'black', rotation: 45 })
      .setLngLat([-38.0135948, -11.179677352])
      .addTo(this.map);
  }


}
