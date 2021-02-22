import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula, RespuestaMDB } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

 
  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];
  constructor(private movieService: MoviesService) {}


  ngOnInit(){
    this.getFeatures();
    this.getPopulares();
  }

  cargarMasPopulares(){
    this.getPopulares();
  }
  cargarMasPoster(){
    this.getFeatures();
  }
  
  
  getFeatures(){
    this.movieService.getFeature()
    .subscribe(resp  => {
      const arregloTemp = [...this.peliculasRecientes, ...resp.results];

      this.peliculasRecientes = arregloTemp;
    });
  }
  
  getPopulares(){
    
    
    this.movieService.getPopulars()
    .subscribe(resp => {
      // this.populares = resp.results
      const arregloTemp=[...this.populares, ...resp.results];
      
      this.populares = arregloTemp;
      
    });
  }
  
}
