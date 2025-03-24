import { Component } from '@angular/core';
import { LocalStorageService } from '../shared/service/rx-service/local-storage.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  username: string;

  constructor(
    private _localStorage: LocalStorageService,
    private dialog: MatDialog,
  ) {
    this.getUsername();
  }

  getUsername() {
    this.username = this._localStorage.getItem('username');
  }

  scrollToContacts() {
    let contactsId = document.getElementById('contacts');
    if (contactsId != null) {
      contactsId.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'http://localhost:4200/#contacts';
    }
  }

  exitAccount(): void {
    this._localStorage.removeItem('username');
    window.location.reload();
  }
}
