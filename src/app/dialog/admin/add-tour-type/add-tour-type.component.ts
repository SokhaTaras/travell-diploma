import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TourType} from '../../../shared/model/TourType';
import {TourTypeService} from '../../../shared/service/server/tour-type.service';

@Component({
  selector: 'admin/add-tour-type',
  templateUrl: './add-tour-type.component.html',
  styleUrls: ['./add-tour-type.component.css']
})
export class AddTourTypeComponent implements OnInit {

  tourType: TourType;

  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTourTypeComponent>,
    private _formBuilder: FormBuilder,
    private _tourTypeService: TourTypeService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
    this.formGroup.valueChanges.subscribe(next => {
      this.tourType = next;
      console.log(next);
    });
  }

  addTourType(): void {
    this._tourTypeService.saveTourType(this.tourType).subscribe(
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

  onNoClick(): void {
    this.dialogRef.close();
  }
}
