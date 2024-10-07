import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../shared/service/rx-service/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string;

  constructor(private _localStorage: LocalStorageService) {
    this.getUsername()
  }

  getUsername() {
    this.username = this._localStorage.getItem('username')
  }

  scrollToContacts() {
    let contactsId = document.getElementById('contacts');
    if (contactsId != null) {
      contactsId.scrollIntoView({behavior: 'smooth'});
    } else {
      window.location.href = 'http://localhost:4200/#contacts';
    }
  }

  ngOnInit() {
  }
}
