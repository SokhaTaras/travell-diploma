import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Hotel} from '../../model/Hotel';
import {Country} from '../../model/Country';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private _httpClient: HttpClient) {
  }

  saveHotel(hotel: Hotel): Observable<any> {
    return this._httpClient.post<Hotel>('/hotels', JSON.stringify(hotel))
      .pipe(catchError(err => throwError(err)));
  }

  findAllHotels(): Observable<Hotel[]> {
    return this._httpClient.get<Hotel[]>('/hotels')
      .pipe(map((value: any) => value._embedded.hotels), catchError(err => throwError(err)));
  }

  findHotelsByCountry(id: number): Observable<Hotel[]> {
    let param: HttpParams = new HttpParams();
    param = param.set('id', String(id));
    return this._httpClient.get<Hotel[]>('/hotels/search/findByCountryId', {params: param})
      .pipe(map((value: any) => value._embedded.hotels), catchError(err => throwError(err)));
  }

  deleteHotel(id: number): Observable<any> {
    return this._httpClient.delete<any>(`/hotels/${id}`)
      .pipe(catchError(error => throwError(error)));
  }

  updateHotel(hotel: Hotel): Observable<any> {
    return this._httpClient.put(`/hotels/${hotel.id}`, JSON.stringify(hotel))
      .pipe(catchError(error => throwError(error)));
  }
}
