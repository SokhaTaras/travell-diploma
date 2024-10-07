import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CountryService} from '../../shared/service/server/country.service';
import {TourTypeService} from '../../shared/service/server/tour-type.service';
import {TourType} from '../../shared/model/TourType';
import {Country} from '../../shared/model/Country';
import {TourService} from '../../shared/service/server/tour.service';
import {Tour} from '../../shared/model/Tour';

@Component({
  selector: 'app-search-tours',
  templateUrl: './search-tours.component.html',
  styleUrls: ['./search-tours.component.css']
})
export class SearchToursComponent implements OnInit {

  tourTypes: TourType[] = [];
  countries: Country[] = [];

  tours: Tour[] = [];

  formGroup: FormGroup = new FormGroup({
    tourType: new FormControl(''),
    country: new FormControl(''),
    minPrice: new FormControl(''),
    maxPrice: new FormControl(''),
    tourStartDate: new FormControl(''),
    tourStopDate: new FormControl(''),
  });

  constructor(private _formBuilder: FormBuilder,
              private _tourService: TourService,
              private _countryService: CountryService,
              private _tourTypeService: TourTypeService,) {

    this.findAllCountries();
    this.findAllTourTypes();
  }

  search(): void {
    let tourTypeId = this.formGroup.get('tourType').value.id;
    let countryId = this.formGroup.get('country').value.id;
    let minPrice = this.formGroup.get('minPrice').value;
    let maxPrice = this.formGroup.get('maxPrice').value;
    let tourStartDate = this.formGroup.get('tourStartDate').value;
    let tourStopDate = this.formGroup.get('tourStopDate').value;
    if (this.formGroup.valid) {
      this._tourService.findAllByTourTypeIdAndCountryIdAndTourDateRangeAndPriceRange(tourTypeId, countryId, tourStartDate, tourStopDate, minPrice, maxPrice).subscribe(
        next => {
          console.log(next);
          this.tours = next;
        },
        error => {
          console.error(error);
        }
      );

      if (this.tours != []) {
        document.getElementsByClassName('search-result')[0].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      }
    }
  }

  findAllTourTypes(): void {
    this._tourTypeService.findAllTourTypes().subscribe(
      next => {
        console.log(next);
        this.tourTypes = next;
      },
      error => {
        console.error(error);
      }
    );
  }

  findAllCountries(): void {
    this._countryService.findAllCountries().subscribe(
      next => {
        console.log(next);
        this.countries = next;
      },
      error => {
        console.error(error);
      }
    );
  }

  ngOnInit() {
  }
}
