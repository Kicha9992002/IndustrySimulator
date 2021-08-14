import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { DataStorageService } from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.authService.autoLogin();
    this.dataStorageService.fetchFactories();
  }
}
