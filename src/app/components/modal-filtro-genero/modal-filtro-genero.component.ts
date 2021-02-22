import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Genre } from '../../interfaces/interfaces';
import { AlertController, ModalController } from '@ionic/angular';
import { Button } from 'protractor';

@Component({
  selector: 'app-modal-filtro-genero',
  templateUrl: './modal-filtro-genero.component.html',
  styleUrls: ['./modal-filtro-genero.component.scss'],
})
export class ModalFiltroGeneroComponent implements OnInit {

  constructor(private moviesService: MoviesService,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController) { }

  generos: Genre[] = [];

  async ngOnInit() {
    this.generos = await this.moviesService.getGeneros();
  }
  onClick(id: any){
    this.modalCtrl.dismiss(id);
  }


  async ShowAlert(){
    const alert = await this.alertCtrl.create({
      message: 'Para Buscar peliculas por categoria solo seleccionala',
      buttons: ['OK']
      
    }) 
    alert.present();
  }
}
