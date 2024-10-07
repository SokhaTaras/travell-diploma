import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddCountryComponent } from '../dialog/admin/add-country/add-country.component';
import { AddHotelComponent } from '../dialog/admin/add-hotel/add-hotel.component';
import { AddTourTypeComponent } from '../dialog/admin/add-tour-type/add-tour-type.component';
import { AddTourComponent } from '../dialog/admin/add-tour/add-tour.component';

@Component({
  selector: 'app-admin',
  styleUrls: ['./admin.component.css'],
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  constructor(public dialog: MatDialog) {}

  public openAddTourTypeDialog(): void {
    const dialogRef = this.dialog.open(AddTourTypeComponent, {});

    dialogRef.afterClosed().subscribe((result) => {});
  }

  public openAddTourDataDialog(): void {
    const dialogRef = this.dialog.open(AddTourComponent, {});

    dialogRef.afterClosed().subscribe((result) => {});
  }

  public openAddCountryDialog(): void {
    const dialogRef = this.dialog.open(AddCountryComponent, {});

    dialogRef.afterClosed().subscribe((result) => {});
  }

  public openAddHotelDialog(): void {
    const dialogRef = this.dialog.open(AddHotelComponent, {});

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
