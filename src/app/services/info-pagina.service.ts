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
  cargando = true;
  equipo : any[] = [];

  constructor( private http: HttpClient ) { 
      this.cargarInfo();
      this.cargarEquipo();
  }


  private cargarInfo(){
    //console.log('servicio info cargado');
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp:InfoPagina) => {
      this.cargando = false;
      this.info = resp;
    })
  }
    private cargarEquipo(){
    this.http.get('https://angular-html-d70f1.firebaseio.com/equipo.json')
    .subscribe( (resp:any[]) => {
      this.equipo = resp;
  })
}
}
