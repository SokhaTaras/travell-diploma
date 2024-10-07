import {Component, OnInit} from '@angular/core';
import {Country} from '../../shared/model/Country';
import {TourTypeService} from '../../shared/service/server/tour-type.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CountryService} from '../../shared/service/server/country.service';
import {TourType} from '../../shared/model/TourType';
import {throwError} from 'rxjs';
import {UpdateTourTypeComponent} from '../../dialog/admin/update-tour-type/update-tour-type.component';
import {UpdateCountryComponent} from '../../dialog/admin/update-country/update-country.component';

@Component({
  selector: 'app-all-countries',
  templateUrl: './all-countries.component.html',
  styleUrls: ['./all-countries.component.css']
})
export class AllCountriesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'geography', 'climate', 'kitchen', 'imagePath', 'update'];

  countries: Country[] = [];

  constructor(private _countryService: CountryService,
              private _snackBar: MatSnackBar,
              private _dialog: MatDialog) {
    this.init();
  }

  deleteCountry(country: Country) {
    this._countryService.deleteCountry(country.id).subscribe(next => {
        this.openSnackBar(`Країна ${country.name} видалений!`, 'OK');
        this.init();
      },
      error => {
        throwError(error);
      });
  }

  openUpdateCountryDialog(country: Country) {
    const dialogRef = this._dialog.open(UpdateCountryComponent, { data: country});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.init()
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  init() {
    this._countryService.findAllCountries().subscribe(
      next => {
        this.countries = next;
        console.log(next);
      },
      error => {
        console.error(error);
      }
    );
  }

  ngOnInit() {
  }

}
