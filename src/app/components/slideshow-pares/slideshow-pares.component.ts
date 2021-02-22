import { EventEmitter,Component, OnInit, Input, Output } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';


@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Output() cargarMas = new EventEmitter();
  slidesOpt = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10,
  }
  @Input() peliculas: Pelicula[] = [];
  constructor(private modalCrtl: ModalController) { }

  ngOnInit() {}


  onClick(){
    this.cargarMas.emit();
  }

  async verDetalle( id: string ){
    const modal = await this.modalCrtl.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    });
    modal.present();
  }
}
