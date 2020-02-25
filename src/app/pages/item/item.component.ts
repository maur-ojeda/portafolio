import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

producto: ProductoDescripcion;
id: string


  constructor( private route: ActivatedRoute, public ProductoService: ProductosService ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parametros => {
        //console.log(parametros['id']);
        this.ProductoService.getProducto(parametros['id']).subscribe(
          (producto: ProductoDescripcion )=> {
            //console.log(producto.categoria)
            this.id = parametros['id'];
            this.producto = producto
          }
        );
      }
    )
  }
}
