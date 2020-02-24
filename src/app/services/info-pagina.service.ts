import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pages.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  //contenedor para el objeto
  info: InfoPagina = {};
  //indicador si la data fue cargada
  cargada = false;

  constructor( private http: HttpClient ) { 
    //console.log('servicio info cargado');
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp:InfoPagina) => {
      this.cargada = true;
      this.info = resp;
      console.log(this.info);
      console.log(resp);
    })
  }
}
