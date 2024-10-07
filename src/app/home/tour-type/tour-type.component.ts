import {Component, OnInit} from '@angular/core';
import {TourType} from '../../shared/model/TourType';
import {TourTypeService} from '../../shared/service/server/tour-type.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'tour-type',
  templateUrl: './tour-type.component.html',
  styleUrls: ['./tour-type.component.css']
})
export class TourTypeComponent implements OnInit {

  tourType: TourType;

  constructor(private _tourTypeService: TourTypeService, private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params.subscribe(next => {
      this.init(next['id']);
      }
    );
  }

  init(id?: number) {
    if (id) {
      this._tourTypeService.findOneTourType(id).subscribe(
        next => {
          this.tourType = next;
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
