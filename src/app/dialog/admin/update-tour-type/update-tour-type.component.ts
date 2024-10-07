import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TourTypeService} from '../../../shared/service/server/tour-type.service';
import {TourType} from '../../../shared/model/TourType';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-tour-type',
  templateUrl: './update-tour-type.component.html',
  styleUrls: ['./update-tour-type.component.css']
})
export class UpdateTourTypeComponent implements OnInit {

  tourType: TourType;

  formGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<UpdateTourTypeComponent>,
              private _formBuilder: FormBuilder,
              private _tourTypeService: TourTypeService,
              @Inject(MAT_DIALOG_DATA) public data: TourType) {
  }

  updateTourType(): void {
    this._tourTypeService.updateTourType(this.tourType).subscribe(
      next => {
        console.log(next)
        this.onNoClick();
        window.location.reload();
      },
      error => {
        console.error(error)
      }
    );
  }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      id: [this.data.id],
      name: [this.data.name, Validators.required],
      description: [this.data.description, Validators.required],
      imagePath: [this.data.imagePath, Validators.required]
    });
    this.formGroup.valueChanges.subscribe(next => {
      this.tourType = next;
      console.log(next);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
