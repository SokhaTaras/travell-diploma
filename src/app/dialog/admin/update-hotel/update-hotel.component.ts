import {Component, Inject, OnInit} from '@angular/core';
import {TourType} from '../../../shared/model/TourType';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TourTypeService} from '../../../shared/service/server/tour-type.service';
import {Hotel} from '../../../shared/model/Hotel';
import {HotelService} from '../../../shared/service/server/hotel.service';
import {Country} from '../../../shared/model/Country';
import {CountryService} from '../../../shared/service/server/country.service';

@Component({
  selector: 'app-update-hotel',
  templateUrl: './update-hotel.component.html',
  styleUrls: ['./update-hotel.component.css']
})
export class UpdateHotelComponent implements OnInit {

  hotel: Hotel;

  countries: Country[] = [];

  formGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<UpdateHotelComponent>,
              private _formBuilder: FormBuilder,
              private _hotelService: HotelService,
              private _countryService: CountryService,
              @Inject(MAT_DIALOG_DATA) public data: Hotel) {
    this.findAllCountries();
  }

  updateHotel(): void {
    this._hotelService.updateHotel(this.hotel).subscribe(
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

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      id: [this.data.id],
      name: [this.data.name, Validators.required],
      address: [this.data.address, Validators.required],
      country: [this.data.country, Validators.required]
    });
    this.formGroup.valueChanges.subscribe(next => {
      this.hotel = next;
      console.log(next);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
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
}
