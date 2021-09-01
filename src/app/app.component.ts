import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import '../../node_modules/leaflet-hotline/dist/leaflet.hotline.js';
import scores from './scores.json';
import chroma from 'chroma-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'accessibility-visualization';

  //hotline = L.hotline(scores.points.map(score => [score.lat, score.long, score.accessibility_score]), {});
  options = {
    layers: [
      L.tileLayer(
        'https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=dKFpUJ6juOZ4bJH0Cl6y', {
        maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
    ],
    zoom: 17,
    center: L.latLng(14.554777, 121.024463)
  };

  layersControl = {
    baseLayers: {
      'Basic': L.tileLayer('https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=dKFpUJ6juOZ4bJH0Cl6y', { maxZoom: 18 }),
      'Bright': L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=dKFpUJ6juOZ4bJH0Cl6y', { maxZoom: 18 }),
      'CH Swisstopo LBM': L.tileLayer('https://api.maptiler.com/maps/ch-swisstopo-lbm-grey/{z}/{x}/{y}.png?key=dKFpUJ6juOZ4bJH0Cl6y', { maxZoom: 18 }),
      'CH Swisstopo LBM Dark': L.tileLayer('https://api.maptiler.com/maps/ch-swisstopo-lbm-dark/{z}/{x}/{y}.png?key=dKFpUJ6juOZ4bJH0Cl6y', { maxZoom: 18 }),
      'CH Swisstopo LBM Vivid': L.tileLayer('https://api.maptiler.com/maps/ch-swisstopo-lbm-vivid/{z}/{x}/{y}.png?key=dKFpUJ6juOZ4bJH0Cl6y', { maxZoom: 18 }),
      'Yoyager': L.tileLayer('https://api.maptiler.com/maps/voyager/{z}/{x}/{y}.png?key=dKFpUJ6juOZ4bJH0Cl6y', { maxZoom: 18 }),
    },
    overlays: {

    }
  }

  layers: any = [];

  constructor() {

  }

  ngOnInit(): void {
    var data: any = scores.map(score => [score.lat, score.long, score.accessibility_score]);
    var circles = data.map((item: any) => L.circle(L.latLng(item[0], item[1]), this.getColor(item[2])));
    var group = L.layerGroup(circles);
    this.layers.push(group);
  }

  scale: any = chroma.scale(['red', 'orange', 'green'])

  getColor(score: number): any {
    let color = this.scale(score / 10);
    return {
      'fill': true,
      'fillOpacity': 0.5,
      'fillColor': color,
      'color': color,
      'opacity': 1.0,
      'weight': 3,
      'radius': 4
    };
  }
}
