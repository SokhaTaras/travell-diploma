import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { throwError } from 'rxjs';

import { UpdateTourTypeComponent } from '../../dialog/admin/update-tour-type/update-tour-type.component';
import { TourType } from '../../shared/model/TourType';
import { TourTypeService } from '../../shared/service/server/tour-type.service';

@Component({
  selector: 'app-all-tours',
  styleUrls: ['./all-tours.component.css'],
  templateUrl: './all-tours.component.html',
})
export class AllToursComponent {
  public displayedColumns: string[] = ['id', 'name', 'description', 'imagePath', 'update', 'delete'];

  public tourTypes: TourType[] = [];

  constructor(
    private tourTypeService: TourTypeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.init();
  }

  public deleteTourType(tourType: TourType) {
    this.tourTypeService.deleteTourType(tourType.id).subscribe(
      (next) => {
        this.openSnackBar(`Тип туру ${tourType.name} видалений!`, 'OK');
        this.init();
      },
      (error) => {
        throwError(error);
      },
    );
  }

  public openUpdateTourTypeDialog(tourType: TourType) {
    const dialogRef = this.dialog.open(UpdateTourTypeComponent, { data: tourType });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.init();
      }
    });
  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public init() {
    this.tourTypeService.findAllTourTypes().subscribe(
      (next) => {
        this.tourTypes = next;
        console.log(next);
      },
      (error) => {
        console.error(error);
      },
    );
  }
}
