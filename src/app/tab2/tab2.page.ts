import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula, PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { ModalController, PopoverController, ActionSheetController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalFiltroGeneroComponent } from '../components/modal-filtro-genero/modal-filtro-genero.component';
import { ɵNgNoValidate } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  ideas: string[] = ['Spiderman', 'SuperMan', 'Avengers', 'El señor de los anillos', 'La dama y el vagabundo'];
  peliculas: PeliculaDetalle[] = [];
  textoBuscar: '';
  buscando = false;
  buscandoMas = '';
  generos: Genre[] = [];
  genero: Genre;
  genreAnterior: Genre;
  constructor(private moviesService: MoviesService,
    private modalCtrl: ModalController,) { }

  async ngOnInit() {
    this.generos = await this.moviesService.getGeneros();;
  }

  Buscar(event) {
    this.buscando = true;
    const valor = event.detail.value;
    this.buscandoMas = event.detail.value;
    if (valor != '') {
      this.moviesService.getPeliculasFiltro(valor)
        .subscribe(resp => {
          console.log(resp)
          this.peliculas = resp['results'];
          this.buscando = false;
        });
    } else {
      this.buscando = false;
      this.peliculas = [];
      return
    }

  }

  loadData(event) {

    this.moviesService.getPeliculasFiltro(this.buscandoMas)
      .subscribe(resp => {
        if (resp['results'].length === 0) {
          event.target.disabled = true;
        } else {
          this.peliculas.push(...resp['results'])
        }
        event.target.complete();
      })

  }


  async levantarModal(id: string) {
    console.log(id)
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });


    modal.present();
  }

  async levantarModalBusqueda() {

    const modal = await this.modalCtrl.create({
      component: ModalFiltroGeneroComponent
    });
    modal.present();

    let id = await modal.onDidDismiss();
    this.genero = this.generos.find(p => p.id == id.data);
    if (this.genero != this.genreAnterior) {
      this.genreAnterior = this.genero;
      this.peliculas = [];
    }
    this.moviesService.getPeliculasPorGeneroConFiltro(this.genreAnterior.id.toString())
      .subscribe(resp => {
        this.peliculas.push(...resp['results'])
      })
  }

}
