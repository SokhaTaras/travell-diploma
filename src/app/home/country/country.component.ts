import { Component, OnInit } from '@angular/core';
import {Country} from '../../shared/model/Country';
import {CountryService} from '../../shared/service/server/country.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  country: Country;

  constructor(private _countryService: CountryService, private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params.subscribe(next => {
        this.init(next['id']);
      }
    );
  }

  init(id?: number) {
    if (id) {
      this._countryService.findOneCountry(id).subscribe(
        next => {
          this.country = next;
          console.log(next);
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  ngOnInit() {
  }

}
