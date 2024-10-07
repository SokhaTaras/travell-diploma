import {Component, Inject, OnInit} from '@angular/core';
import {TourType} from '../../../shared/model/TourType';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TourTypeService} from '../../../shared/service/server/tour-type.service';
import {Hotel} from '../../../shared/model/Hotel';
import {HotelService} from '../../../shared/service/server/hotel.service';
import {CountryService} from '../../../shared/service/server/country.service';
import { Country } from 'src/app/shared/model/Country';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit {

  hotel: Hotel;

  formGroup: FormGroup;
  countries: Country[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddHotelComponent>,
    private _formBuilder: FormBuilder,
    private _hotelService: HotelService,
    private _countryService: CountryService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.findAllCountries()
  }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      name: [null, Validators.required],
      address: [null, Validators.required],
      country: [null, Validators.required]
    });
    this.formGroup.valueChanges.subscribe(next => {
      this.hotel = next;
      console.log(next);
    });
  }

  addHotel(): void {
    this._hotelService.saveHotel(this.hotel).subscribe(
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

  onNoClick(): void {
    this.dialogRef.close();
  }

}
