import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private _dashboard: boolean;
  private _services: boolean;
  private router: Router;
  private _creations: boolean;


  get creations(): boolean {
    return this._creations;
  }

  set creations(value: boolean) {
    this._creations = value;
  }

  get dashboard(): boolean {
    return this._dashboard;
  }

  set dashboard(value: boolean) {
    this._dashboard = value;
  }

  get services(): boolean {
    return this._services;
  }

  set services(value: boolean) {
    this._services = value;
  }

  public goDashboard() {
    this.router.navigate(['en/dashboard']);
  }

  public goServices() {
    this.router.navigate(['en/services']);
  }

  public goCreations() {
    this.router.navigate(['en/creations']);
  }

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit() {
    if (window.location.pathname === ('en/dashboard' || '/')) {
      this.dashboard = true;
    } else if (window.location.pathname === 'en/services') {
      this.services = true;
    } else if (window.location.pathname === 'en/creations') {
      this.creations = true;
    }
  }

}
