import { Component, OnInit } from '@angular/core';
import {Hotel} from '../../shared/model/Hotel';
import {MatDialog, MatSnackBar} from '@angular/material';
import {HotelService} from '../../shared/service/server/hotel.service';
import {throwError} from 'rxjs';
import {UpdateHotelComponent} from '../../dialog/admin/update-hotel/update-hotel.component';

@Component({
  selector: 'app-all-hotels',
  templateUrl: './all-hotels.component.html',
  styleUrls: ['./all-hotels.component.css']
})
export class AllHotelsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'country', 'address', 'update', 'delete'];

  hotels: Hotel[] = [];

  constructor(private _hotelService: HotelService,
              private _snackBar: MatSnackBar,
              private _dialog: MatDialog) {
    this.init()
  }

  deleteHotel(hotel: Hotel) {
    this._hotelService.deleteHotel(hotel.id).subscribe(next => {
        this.openSnackBar(`Готель ${hotel.name} видалений!`, 'OK');
        this.init();
      },
      error => {
        throwError(error);
      });
  }

  openUpdateHotelDialog(hotel: Hotel) {
    const dialogRef = this._dialog.open(UpdateHotelComponent, { data: hotel});
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
    this._hotelService.findAllHotels().subscribe(
      next => {
        this.hotels = next;
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
