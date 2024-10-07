import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {TourType} from '../../model/TourType';
import {catchError, map} from 'rxjs/operators';
import {error} from 'util';

@Injectable({
  providedIn: 'root'
})
export class TourTypeService {

  constructor(private _httpClient: HttpClient) {
  }

  saveTourType(tourType: TourType): Observable<any> {
    return this._httpClient.post<TourType>('/tourTypes', JSON.stringify(tourType))
      .pipe(catchError(err => throwError(err)));
  }

  findAllTourTypes(): Observable<TourType[]> {
    return this._httpClient.get<TourType[]>('/tourTypes')
      .pipe(map((value: any) => value._embedded.tourTypes), catchError(err => throwError(err)));
  }

  findOneTourType(id: number): Observable<TourType> {
    return this._httpClient.get<TourType>(`/tourTypes/${id}`)
      .pipe(catchError(error => throwError(error)))
  }

  deleteTourType(id: number): Observable<any> {
    return this._httpClient.delete<any>(`/tourTypes/${id}`)
      .pipe(catchError(error => throwError(error)));
  }

  updateTourType(tourType: TourType): Observable<any> {
    return this._httpClient.put(`/tourTypes/${tourType.id}`, JSON.stringify(tourType))
      .pipe(catchError(error => throwError(error)))
  }
}
