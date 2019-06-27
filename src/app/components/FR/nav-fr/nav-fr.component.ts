import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-fr',
  templateUrl: './nav-fr.component.html',
  styleUrls: ['./nav-fr.component.css']
})
export class NavFRComponent implements OnInit {

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

  public goDashboardFr() {
    localStorage.setItem('enlang', 'en');
    this.router.navigate(['en/dashboard']);
  }

  public goServices() {
    this.router.navigate(['fr/services']);
  }

  public goCreations() {
    this.router.navigate(['fr/creations']);
  }

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit() {
    if (window.location.pathname === ('fr/dashboard' || '/')) {
      this.dashboard = true;
    } else if (window.location.pathname === 'fr/services') {
      this.services = true;
    } else if (window.location.pathname === 'fr/creations') {
      this.creations = true;
    }
  }
}
