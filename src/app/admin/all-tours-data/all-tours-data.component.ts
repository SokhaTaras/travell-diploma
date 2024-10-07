import { Component, OnInit } from '@angular/core';
import {TourType} from '../../shared/model/TourType';
import {TourTypeService} from '../../shared/service/server/tour-type.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {throwError} from 'rxjs';
import {UpdateTourTypeComponent} from '../../dialog/admin/update-tour-type/update-tour-type.component';
import {Tour} from '../../shared/model/Tour';
import {TourService} from '../../shared/service/server/tour.service';
import {UpdateTourComponent} from '../../dialog/admin/update-tour/update-tour.component';

@Component({
  selector: 'app-all-tours-data',
  templateUrl: './all-tours-data.component.html',
  styleUrls: ['./all-tours-data.component.css']
})
export class AllToursDataComponent implements OnInit {

  displayedColumns: string[] = ['id', 'tourType', 'country', 'hotel', 'price', 'tourStartDate', 'tourStopDate', 'update', 'delete'];

  tours: Tour[] = [];

  constructor(private _tourService: TourService,
              private _snackBar: MatSnackBar,
              private _dialog: MatDialog) {
    this.init();
  }

  deleteTour(tour: Tour) {
    this._tourService.deleteTour(tour.id).subscribe(next => {
        this.openSnackBar(`Тур видалений!`, 'OK');
        this.init();
      },
      error => {
        throwError(error);
      });
  }

  openUpdateTourDialog(tour: Tour) {
    const dialogRef = this._dialog.open(UpdateTourComponent, { data: tour});
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
    this._tourService.findAllTours().subscribe(
      next => {
        this.tours = next;
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
