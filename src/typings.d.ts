import * as L from 'leaflet';
declare module 'leaflet' {
  interface Hotline {
    addTo(map: L.Map): any;
  }

  function hotline(data: any, options: any): L.Hotline;
}
