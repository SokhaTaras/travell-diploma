import { Component, OnInit } from '@angular/core';
import {TourTypeService} from '../../shared/service/server/tour-type.service';
import {TourType} from '../../shared/model/TourType';

@Component({
  selector: 'tour-types',
  templateUrl: './tour-types.component.html',
  styleUrls: ['./tour-types.component.css']
})
export class TourTypesComponent implements OnInit {

  tourTypes: TourType[] = [];

  constructor(private _tourTypeService: TourTypeService) {
    this.init()
  }

  init() {
    this._tourTypeService.findAllTourTypes().subscribe(
      next => {
        this.tourTypes = next;
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
