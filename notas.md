# Angular

levantar servidor de prueba

```
ng serve
```



## Componetes

### Generación de componentes

```
ng g c shared/nameOfComponent
```

crea css, html, ts 

y modifica el archivo app.module.ts que es en donde se registran los componenetes

```
<!--The content below is only a placeholder and can be replaced.-->
<app-nameOfComponent></app-nameOfComponent>
```



## Pages

### Generación de pages

```
ng g c pages/nameOfPage
```

## Navegación

se controla desde  app/App-routing.module.ts

###### TODO: revisar la creacion de route con NG CLI

```
const routes: Routes = [
  { path: '', component: PortafolioComponent },
  { path: 'about', component: AboutComponent },
  { path: 'item', component: ItemComponent},
  { path: '**', pathMatch: 'full',  redirectTo: ''}
];


@NgModule({
//para servidores en donde no se tiene accso al htaccess se usa {useHash: true} para decirle al servidor que la ruta no son directorios
imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }



// se registran las rutas en path y al componenete que corresponden
para cualquier otra ruta  sera redirida al "Home"
  { path: '**', pathMatch: 'full',  redirectTo: ''}


```

### App routing 

controla las rutas  y en app.component.html se icorpora

```
    <router-outlet></router-outlet>
```

 y en los links se usa asi

```
<a routerLink="ruta">link<a/>
```



## Servicios

Es donde se comparten informacion global o manejan cierta lógica

crear un servicio que lea la toda la informacion de json y comparta 

```
ng g s services/infoPagina --skipTests=true
```

los servicios usualmente se usan en la sección de los provider luego de su importacion

en app.component.ts
se importa el servicio

"import { InfoPaginaService } from './services/info-pagina.service';"

  y se crea un constructor que llame el servicio

   ```
import { Component } from '@angular/core';
import { InfoPaginaService } from './services/info-pagina.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  //title = 'portafolio';
constructor( public infoPaginaService: InfoPaginaService ){
}

}

   ```



### Lectura de json

en el archivo :``src/app/app.module.ts`` 
Se importa el **HttpClientModule**, que permite realizar  peticiones http (put, get , etc a servidores rest ) y en la sección de **imports** se incluye  “**HttpClientModule**” el nombre del módulo

```
...
import { HttpClientModule } from '@angular/common/http';
...

@NgModule({
  declarations: [...],
  imports: [
		...
    HttpClientModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }

```

 en ``src/app/services/info-pagina.service.ts`` se importa la referencia al servicio de httpClient  y luego se pone en el constructor para usarlo

```js
import ...;
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  constructor( private http: HttpClient ) { 
    console.log('servicio info cargado');
  }
}

```

para relizar un get de un archivo local:

```js
 export class InfoPaginaService {
   info: any = {};
	cargada = false;
   
 	constructor( private http: HttpClient ) { 
    this.http.get('assets/data/data-pagina.json')
    .subscribe(
    	// ya que no se sabe que tipo de dato se trae se puede poner //
    	(resp:any) => {console.log(resp.titulo)}
			// si se conoce el campo a traer
    	resp => {console.log(resp['titulo'])
    	// trae todo
    	resp => {console.log(resp)
    })
 	}
 }
```

### Interface

###### TODO: revisar la creacion de interfaces con NG CLI

se crea una carpeta para las interfaces ``src/app/interfaces`` y el archivo ``info-pagina.service.ts``

```js
export interface InfoPagina {
//  titulo?: string;  '?' convierte al valor como opcional, si no tiene '?' es obligatorio
  	titulo: string;
    email: string;
    nombre_corto: string;
    pagina_autor: string;
    facebook: string;
    twitter: string;
    instagran: string;
    tublr: string;
    equipo_trabajo: any[]; 
}
```

``src/app/services/info-pagina.service.ts``

```js
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pages.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  //se incorpora la interface
  info: InfoPagina = {};
  //indicador si la data fue cargada
  cargada = false;

  constructor( private http: HttpClient ) { 
    this.http.get('assets/data/data-pagina.json')
    //la respuesta es de tipo infoPagina
    .subscribe( (resp:infoPagina) => {
      this.cargada = true;
      this.info = resp
    })
  }
}

```

### Utilizando los datos de interface en las páginas

 se debe importar el servicio a la sección o componenete y luego pasarlo al contructor el cual lo disponibiliza para el html para se usado  en este caso ``{{infoPaginaServicio.info.titulo}``

componente.ts

```
import ...
import { InfoPaginaService } from 'src/app/services/info-pagina.service';


@Component({
  ...
  })
export class HeaderComponent implements OnInit {

  constructor( public infoPaginaServicio: InfoPaginaService
     ) {
      }

  ngOnInit(): void {
  }
}

```

 

### Utilizando datos de firebase

```
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
  
  equipo : any[] = [];

  constructor( private http: HttpClient ) { 
      this.cargarInfo();
      this.cargarEquipo();
  }


  private cargarInfo(){
    //console.log('servicio info cargado');
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp:InfoPagina) => {
      this.cargada = true;
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
```

y luego en la pagina que consumira el servicio, se importa y se pasa como parametro del constructor

```
import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public infoService: InfoPaginaService) { }

  ngOnInit(): void {
  }
}

```

en html itera con la direciva ng todos los registros en  infoservice

```
      <div *ngFor="let persona of infoService.equipo" class="ae-grid__item item-lg-4 ae-kappa au-mb-3 animated fadeIn">
        <img src="{{persona.url}}" alt="" class="au-mb-3">
        <h5 class="ae-u-bolder au-mt-2">{{persona.nombre}}</h5>
        <p class="ae-u-bolder au-mb-3">{{persona.subtitle}}</p>
        <p class="au-lg-ta-left au-mb-3 au-pl-4 au-pr-4">{{persona.frase}}</p><a target="_blank" href="{{persona.twitter}}" class="ae-u-bolder au-underline">{{persona.twitter}}</a>
      </div>


```

Servicio de productos

```

```

