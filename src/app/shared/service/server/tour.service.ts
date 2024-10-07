import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TourType} from '../../model/TourType';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Tour} from '../../model/Tour';
import {Hotel} from '../../model/Hotel';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private _httpClient: HttpClient) {
  }

  saveTour(tour: Tour): Observable<any> {
    return this._httpClient.post<Tour>('/tours', JSON.stringify(tour))
      .pipe(catchError(err => throwError(err)));
  }

  findAllTours(): Observable<Tour[]> {
    return this._httpClient.get<Tour[]>('/tours')
      .pipe(map((value: any) => value._embedded.tours), catchError(err => throwError(err)));
  }

  findOneTour(id: number): Observable<Tour> {
    return this._httpClient.get<Tour>(`/tours/${id}`)
      .pipe(catchError(error => throwError(error)));
  }

  deleteTour(id: number): Observable<any> {
    return this._httpClient.delete<any>(`/tours/${id}`)
      .pipe(catchError(error => throwError(error)));
  }

  updateTour(tour: Tour): Observable<any> {
    return this._httpClient.put(`/tours/${tour.id}`, JSON.stringify(tour))
      .pipe(catchError(error => throwError(error)));
  }

  findAllByTourTypeIdAndCountryIdAndTourDateRangeAndPriceRange(tourTypeId: number, countryId: number, tourStartDate: Date, tourStopDate: Date, priceMin: number, priceMax: number): Observable<Tour[]> {
    let param: HttpParams = new HttpParams();
    if (tourTypeId != null) {
      param = param.set('tourTypeId', String(tourTypeId));
    }
    if (countryId != null) {
      param = param.set('countryId', String(countryId));
    }
    param = param.set('tourStartDate', tourStartDate.toISOString().replace('T', ' ').replace('.000Z', '.0'));
    param = param.set('tourStopDate', tourStopDate.toISOString().replace('T', ' ').replace('.000Z', '.0'));
    if (priceMin != null) {
      param = param.set('priceMin', String(priceMin));
    }
    if (priceMax != null) {
      param = param.set('priceMax', String(priceMax));
    }
    return this._httpClient.get<Tour[]>('/tours/search/findAllByTourTypeIdAndCountryIdAndTourDateRangeAndPriceRange', {params: param})
      .pipe(map((value: any) => value._embedded.tours), catchError(err => throwError(err)));
  }
}
