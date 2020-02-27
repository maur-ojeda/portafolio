import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;  
  productos: Producto[]= [];
  productosFiltrado: Producto[]= [];


  constructor( private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise( (resolve, reject ) =>  {

      this.http.get('https://angular-html-d70f1.firebaseio.com/productos_idx.json')
      .subscribe( (resp:Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          //promesa termino correctamente
          resolve();
        });

    });





  } 

  getProducto(id: string){
    console.log(id);
    //template literales
    return this.http.get(`https://angular-html-d70f1.firebaseio.com/productos/${id}.json`);
  
  }

  buscarProducto(termino: string){

if(this.productos.length === 0){
  //cargar
  this.cargarProductos().then(()=>{
// ejecutar despues de tener productos
// aplicar filtro
  this.filtrarProductos(termino)
  })
}else{
//aplicar filtro
  this.filtrarProductos(termino)
}
  }

  private filtrarProductos(termino: string){
    // se purga el arreglo para evitar que salgan items repetidos
    this.productosFiltrado =[];
    // se pasa el termino a lowercase
    termino = termino.toLocaleLowerCase();
    

    // recorremos los productos
    //recibimos un producto
    // y buscamos si la catergoria coincide con lo que la persona escribe
    this.productos.forEach( prod =>{
    //si la categoria o el titulo coicide en algo con lo buscado
    // se pasa el titulo a lowercase
    const tituloLower = prod.titulo.toLocaleLowerCase()
    if( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ){
      this.productosFiltrado.push(prod);
    }
  })

  }
}
