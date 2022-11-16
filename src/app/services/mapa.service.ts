import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import cl from 'src/assets/data/cl.json';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  capitals: string = '/assets/data/usa-capitals.geojson';

  constructor(
    private http: HttpClient,
  ) { }

  makeRegionMarkers = (map: L.map) => {

    cl.forEach(ciudad => {
      const lon = ciudad.lng;
      const lat = ciudad.lat;
      
      const marker = L.marker([lat, lon]);
      marker.addTo(map);
    });

  };
  makeRegionCircleMarkers = (map: L.map) => {

    const maxPop = Math.max(...cl.map(x => Number(x.population)), 0);

    cl.forEach(ciudad => {
      const lon = ciudad.lng;
      const lat = ciudad.lat;
      const circle = L.circleMarker([lat, lon], {
        radius: MapaService.scaledRadius(Number(ciudad.population), maxPop)
      });

      const ciudadPopup = {
        name: ciudad.city,
        state: ciudad.admin_name,
        population: ciudad.population
      };

      circle.bindPopup(this.makeCapitalPopup(ciudadPopup));
      
      circle.addTo(map);
    });
  };
  getRegionesShapes() {
    // return this.http.get('/assets/data/regiones_edit.geojson');
    return this.http.get('/assets/data/region_v3.geojson');
  };
  
  makeCapitalMarkers(map: L.map): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);
        
        marker.addTo(map);
      }
    });
  };
  makeCapitalCircleMarkers(map: L.map): void {
    this.http.get(this.capitals).subscribe((res: any) => {

      const maxPop = Math.max(...res.features.map(x => x.properties.population), 0);
      
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const circle = L.circleMarker([lat, lon], {
          radius: MapaService.scaledRadius(c.properties.population, maxPop)
        });
        
        circle.bindPopup(this.makeCapitalPopup(c.properties));
        
        circle.addTo(map);
      }
    });
  };
  getStateShapes() {
    // return this.http.get('/assets/data/gz_2010_us_040_00_5m.json');
    return this.http.get('/assets/data/gz_2010_us_040_00_500k.json');
  };
  
  makeCapitalPopup = (data: any) => {
    return `` +
    `<div>Capital: ${ data.name }</div>` +
    `<div>State: ${ data.state }</div>` +
    `<div>Population: ${ data.population }</div>`
  };
  static scaledRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }

}
