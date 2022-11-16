import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapaService } from 'src/app/services/mapa.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements AfterViewInit {

  private map;
  private states;
  regiones: any

  latLong: number[] = [];

  constructor(
    private mapaService: MapaService
  ) {}
  
  ngAfterViewInit() {

    if (navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition(position => {
        // console.log('position.coords', position.coords);
        this.latLong = [position.coords.latitude, position.coords.longitude];
        
        this.initMap()

        //OPCIONES POLIGONOS, MARCADORES Y POPUP
        //agrega un marcador o pin con popup
        const marker = L.marker(this.latLong).addTo(this.map);
        // marker.bindPopup('<b>Hola mundo</b>').openPopup();

        //agrega popup con mensaje
        // const popup = L.popup()
        // .setLatLng(this.latLong)
        // .setContent('esto es el contenido')
        // .openOn(this.map);

        // MAPAS CHILE Y REGIONES
        // this.mapaService.makeRegionMarkers(this.map);
        // this.mapaService.makeRegionCircleMarkers(this.map);
        this.mapaService.getRegionesShapes().subscribe((regiones: any) => {
          this.regiones = regiones;
          this.initRegionesLayer();
        });

      });

    }
    else{
      console.log('location is not supported');
    };

  }

  initMap = () => {

    const lalong = !this.latLong ? [-33.4361704,-70.6573578] : this.latLong;
    // console.log('lalong', lalong);

    this.map = L.map('map').setView([lalong[0], lalong[1]], 4);;

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

  };

  private initStatesLayer() {
    const stateLayer = L.geoJSON(this.states, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.8,
        fillColor: '#6DB65B'
      }),
      onEachFeature: (feature, layer) => (
        layer.on({
          mouseover: (e) => (this.highlightFeature(e)),
          mouseout: (e) => (this.resetFeature(e)),
        })
      )
    });
    
    this.map.addLayer(stateLayer);
    stateLayer.bringToBack();
  };

  highlightFeature = (e) => {
    const layer = e.target;
  
    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7      
      // weight: 10,
      // opacity: 1.0,
      // color: '#DFA612',
      // fillOpacity: 1.0,
      // fillColor: '#FAE042'
    });
    
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    };
  };
  
  resetFeature = (e) => {
    const layer = e.target;
  
    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.8,
      fillColor: '#6DB65B'
    });
  };

  initRegionesLayer = () => {

    const regionLayer = this.regionLayer(this.regiones);
    
    this.map.addLayer(regionLayer);
    regionLayer.bringToBack();
  };

  regionLayer = (regiones) => {
    return L.geoJSON(regiones, {
      style: this.style,
      onEachFeature: (feature, layer) => (
        layer.on({
          mouseover: this.highlightFeature,
          mouseout: this.resetFeature,          
          click: this.zoomToFeature
        })
      )
    });
  };

  style = (feature) => {
    // console.log('feature.properties.PERSONAS', feature.properties.PERSONAS);
    return {

        fillColor: this.getColor(feature.properties.PERSONAS),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }

  getColor = (d) => {
    return d > 7000000 ? '#800026' :
           d > 5000000  ? '#BD0026' :
           d > 2000000  ? '#E31A1C' :
           d > 1500000  ? '#FC4E2A' :
           d > 900000   ? '#FD8D3C' :
           d > 300000   ? '#FEB24C' :
           d > 100000   ? '#FED976' :
                      '#FFEDA0';
  };

  zoomToFeature = (e) => {
    this.map.fitBounds(e.target.getBounds());
  };

}
