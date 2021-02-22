import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Output() cargarMas = new EventEmitter();
  @Output() load = new EventEmitter();
  slideOpt = {
    slidesPerView: 3.2,
    freeMode: true,
  };

  @Input() peliculas: Pelicula[] = [];
  
  constructor(private modalCrtl: ModalController) { }

  ngOnInit() {}

  async verDetalle(id: string){
    const modal = await this.modalCrtl.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    });
    modal.onDidDismiss().then(data =>{
      this.load.emit();
    });
    modal.present();
  }

  onClick(){
    this.cargarMas.emit();
  }
}
