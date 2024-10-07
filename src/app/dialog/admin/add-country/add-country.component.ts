import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Country} from '../../../shared/model/Country';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CountryService} from '../../../shared/service/server/country.service';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {

  country: Country;

  formGroup: FormGroup;


  constructor(public dialogRef: MatDialogRef<AddCountryComponent>,
              private _formBuilder: FormBuilder,
              private _countryService: CountryService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      geography: [null, Validators.required],
      kitchen: [null, Validators.required],
      climate: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
    this.formGroup.valueChanges.subscribe(next => {
      this.country = next;
      console.log(next);
    });
  }

  addCountry(): void {
    this._countryService.saveCountry(this.country).subscribe(
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

  onNoClick(): void {
    this.dialogRef.close();
  }
}
