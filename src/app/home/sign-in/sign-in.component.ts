import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Country} from '../../shared/model/Country';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CountryService} from '../../shared/service/server/country.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../shared/service/rx-service/local-storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  country: Country;

  formGroup: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });


  constructor(private _formBuilder: FormBuilder,
              private _router: Router,
              private _localStorage: LocalStorageService) { }

  submit(): void {
    if (this.formGroup.valid) {
      if (this.formGroup.get('username').value == 'admin' && this.formGroup.get('password').value  == 'admin') {
        window.location.href = 'http://localhost:4200/admin'
        localStorage.setItem('username', this.formGroup.get('username').value)
      } else {
        window.location.href = 'http://localhost:4200/'
        localStorage.setItem('username', this.formGroup.get('username').value)
      }
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  ngOnInit(): void {
  }
}
