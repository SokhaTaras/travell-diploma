import {Component, Inject, OnInit} from '@angular/core';
import {TourType} from '../../../shared/model/TourType';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TourTypeService} from '../../../shared/service/server/tour-type.service';
import {TourService} from '../../../shared/service/server/tour.service';
import {Tour} from '../../../shared/model/Tour';
import {Country} from '../../../shared/model/Country';
import {CountryService} from '../../../shared/service/server/country.service';
import {Hotel} from '../../../shared/model/Hotel';
import {HotelService} from '../../../shared/service/server/hotel.service';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.css']
})
export class AddTourComponent implements OnInit {

  tour: Tour;

  tourTypes: TourType[] = [];
  countries: Country[] = [];
  hotels: Hotel[] = [];

  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTourComponent>,
    private _formBuilder: FormBuilder,
    private _tourService: TourService,
    private _countryService: CountryService,
    private _tourTypeService: TourTypeService,
    private _hotelService: HotelService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.findAllCountries()
    this.findAllTourTypes()
  }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      tourType: [null, Validators.required],
      country: [null, Validators.required],
      hotel: [null, Validators.required],
      price: [null, Validators.required],
      tourStartDate: [null, Validators.required],
      tourStopDate: [null, Validators.required]
    });
    this.formGroup.valueChanges.subscribe(next => {
      this.tour = next;
      console.log(next);
    });
  }

  addTour(): void {
    this._tourService.saveTour(this.tour).subscribe(
      next => {
        console.log(next)
        this.onNoClick();
        window.location.reload();
      },
      error => {
        console.error(error)
      }
    );
  }

  findAllTourTypes(): void {
    this._tourTypeService.findAllTourTypes().subscribe(
      next => {
        console.log(next)
        this.tourTypes = next
      },
      error => {
        console.error(error)
      }
    );
  }

  findAllCountries(): void {
    this._countryService.findAllCountries().subscribe(
      next => {
        console.log(next)
        this.countries = next
      },
      error => {
        console.error(error)
      }
    );
  }

  findHotels(country: Country): void {
    this._hotelService.findHotelsByCountry(country.id).subscribe(
      next => {
        console.log(next)
        this.hotels = next
      },
      error => {
        console.error(error)
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
