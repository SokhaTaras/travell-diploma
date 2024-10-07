import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Country} from '../../model/Country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private _httpClient: HttpClient) { }

  saveCountry(country: Country): Observable<any> {
    return this._httpClient.post<Country>('/countries', JSON.stringify(country))
      .pipe(catchError(err => throwError(err)));
  }

  findAllCountries(): Observable<Country[]> {
    return this._httpClient.get<Country[]>('/countries')
      .pipe(map((value: any) => value._embedded.countries), catchError(err => throwError(err)));
  }

  findOneCountry(id: number): Observable<Country> {
    return this._httpClient.get<Country>(`/countries/${id}`)
      .pipe(catchError(error => throwError(error)))
  }

  deleteCountry(id: number): Observable<any> {
    return this._httpClient.delete<any>(`/countries/${id}`)
      .pipe(catchError(error => throwError(error)));
  }

  updateCountry(country: Country): Observable<any> {
    return this._httpClient.put(`/countries/${country.id}`, JSON.stringify(country))
      .pipe(catchError(error => throwError(error)))
  }
}
