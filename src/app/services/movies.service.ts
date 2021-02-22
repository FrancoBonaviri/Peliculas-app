import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, Cast, RespuestaCredits, Genre, Pelicula } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { stringify } from 'querystring';
import { isNull, isNullOrUndefined } from 'util';

const url = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }
  private popularesPage = 0;
  private filtroPage = 0;
  private filtroAnterior: string;
  private fearturPage = 0;
  generos: Genre[] = [];
  private filtroGenerosPage = 0;
  private generoAnterior: string = '0';
  private ejectarQuery<T>(query: string){
    query = url + query;
    query += `&api_key=${apiKey}&language=es&include_image_lenguaje=es`;
    console.log(query)
    return this.http.get<T>( query );
  }

  getFeature(){
    let hoy = new Date();
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0 ).getDate();
    const mes = hoy.getMonth() + 1;
    let mesString;


    if(mes < 10){
      mesString = '0' + mes;
    }else{
      mesString = mes;
    }
    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const final = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;
    this.fearturPage++;
    return this.ejectarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${final}&page=${this.fearturPage}`)
  }


  getPopulars(){
    this.popularesPage ++;
    const query = `/movie/popular?page=${this.popularesPage}`;
    return this.ejectarQuery<RespuestaMDB>( query );
  }


  getPeliculaDetalle(id: string){
    return this.ejectarQuery<PeliculaDetalle>(`/movie/${ id }?a=1`);
  }

  getActores(id: string){
    return this.ejectarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`)
  }

  getPeliculasFiltro(filtro: string){
    if(filtro == ''){
      return
    }
    if(this.filtroAnterior != filtro){
      this.filtroPage = 1;
      this.filtroAnterior = filtro
    } else {
      this.filtroPage++;
    }
    return this.ejectarQuery<PeliculaDetalle>(`/search/movie?query=${filtro}&page=${this.filtroPage}`);
  }
  getGeneros():Promise<Genre[]>{

    return new Promise(resolve => {
      this.ejectarQuery(`/genre/movie/list?a=1`)
        .subscribe(resp => {
          this.generos = resp['genres'];
          resolve(this.generos);
        });
    });

  }


  getPeliculasPorGeneroConFiltro(genreId: string){
    if(this.generoAnterior === genreId){
      this.filtroGenerosPage++
    } else {
      this.generoAnterior = genreId;
      this.filtroGenerosPage = 1;
    }
    return this.ejectarQuery<RespuestaMDB>(`/discover/movie?whit_genres=${genreId}&page=${this.filtroGenerosPage}`)
  }
}
