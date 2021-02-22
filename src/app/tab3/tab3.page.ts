import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit {
  favoritoGenero: any[] = [];
  generos: Genre[] = [];
  peliculas : PeliculaDetalle[]= [];
  constructor(private dataLocal: DataLocalService,
              private moviesService: MoviesService) {}


  async ngOnInit(){
  }

  async ionViewWillEnter() { //Metodo que se dispara cuando entro a una pantalla (diferente del ngOnInit)
    await this.cargarDatos();
  }

  async cargarDatos() {
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.moviesService.getGeneros();
    this.peliculasXGenero(this.peliculas, this.generos);
  }

  peliculasXGenero(peliculas: PeliculaDetalle[], generos: Genre[]){

    this.favoritoGenero = [];
    generos.forEach(genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter( peli => {
          return peli.genres.find( genre => genre.id === genero.id )
        })
      });

    });
    console.log(this.favoritoGenero);
  }
}
