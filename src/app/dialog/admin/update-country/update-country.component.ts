import {Component, Inject, OnInit} from '@angular/core';
import {TourType} from '../../../shared/model/TourType';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Country} from '../../../shared/model/Country';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TourTypeService} from '../../../shared/service/server/tour-type.service';
import {CountryService} from '../../../shared/service/server/country.service';

@Component({
  selector: 'app-update-country',
  templateUrl: './update-country.component.html',
  styleUrls: ['./update-country.component.css']
})
export class UpdateCountryComponent implements OnInit {

  country: Country;

  formGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<UpdateCountryComponent>,
              private _formBuilder: FormBuilder,
              private _countryService: CountryService,
              @Inject(MAT_DIALOG_DATA) public data: Country) { }

  updateTourType(): void {
    this._countryService.updateCountry(this.country).subscribe(
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
      description: [this.data.description, Validators.required],
      geography: [this.data.geography, Validators.required],
      kitchen: [this.data.kitchen, Validators.required],
      climate: [this.data.climate, Validators.required],
      imagePath: [this.data.imagePath, Validators.required]
    });
    this.formGroup.valueChanges.subscribe(next => {
      this.country = next;
      console.log(next);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
