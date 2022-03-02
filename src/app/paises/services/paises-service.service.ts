import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaisFronteras, PaisSmall } from '../interfaces/paises.interace';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private baseUrl: string = 'https://restcountries.com/v3.1';

  private _regiones: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  public get regiones(): string[] {
    return [...this._regiones];
  }

  constructor(private http: HttpClient) {}

  getPaisesPorRegion(region: string): Observable<PaisSmall[]> {
    const url: string = `${this.baseUrl}/region/${region}?fields=cca3,name`;
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisPorCodigo(codigo: string): Observable<PaisFronteras | null> {
    if (!codigo) {
      return of(null);
    }
    const url: string = `${this.baseUrl}/alpha/${codigo}?fields=borders,name`;
    return this.http.get<PaisFronteras>(url);
  }

  getPaisPorCodigoSmall(codigo: string): Observable<PaisSmall> {
    const url: string = `${this.baseUrl}/alpha/${codigo}?fields=name,cca3`;
    return this.http.get<PaisSmall>(url);
  }

  getPaisPorCodigos(borders: string[]): Observable<PaisSmall[]> {
    if(!borders){
      return of([]);
    }

    const peticiones: Observable<PaisSmall>[]= [];

    borders.forEach( codigo => {
      const peticion = this.getPaisPorCodigoSmall(codigo);
      peticiones.push(peticion );
    });
    return combineLatest(peticiones);
  }
}
