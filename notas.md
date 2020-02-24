angular  generar componete

```
ng g c shared/header
```

crea css, html, ts (--spec=false / sin archivo de prueba)

y modifica el archivo app.module.ts que es en donde se registran los componenetes



## Navegacion

se controla desde  app/App-routing.module.ts

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

App routing 

controla las rutas

 y en app.component.html se icorpora

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

