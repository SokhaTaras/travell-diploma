import { Component, OnInit } from '@angular/core';
import {Country} from '../../shared/model/Country';
import {CountryService} from '../../shared/service/server/country.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: Country[];

  constructor(private _countriesService: CountryService) {
    this.init();
  }

  init() {
    this._countriesService.findAllCountries().subscribe(
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
