import { Component } from '@angular/core';
import {AddTourTypeComponent} from '../dialog/admin/add-tour-type/add-tour-type.component';
import {MatDialog} from '@angular/material';
import {AddCountryComponent} from '../dialog/admin/add-country/add-country.component';
import {AddHotelComponent} from '../dialog/admin/add-hotel/add-hotel.component';
import {AddTourComponent} from '../dialog/admin/add-tour/add-tour.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(public dialog: MatDialog) {}

  openAddTourTypeDialog(): void {
    const dialogRef = this.dialog.open(AddTourTypeComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openAddTourDataDialog(): void {
    const dialogRef = this.dialog.open(AddTourComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openAddCountryDialog(): void {
    const dialogRef = this.dialog.open(AddCountryComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openAddHotelDialog(): void {
    const dialogRef = this.dialog.open(AddHotelComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
