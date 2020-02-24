import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  //contenedor para el objeto
  info: any = {};
  //indicador si la data fue cargada
  cargada = false;

  constructor( private http: HttpClient ) { 
    //console.log('servicio info cargado');
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp) => {
      this.cargada = true;
      this.info = resp
    })
  }
}
