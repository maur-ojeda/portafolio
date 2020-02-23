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

