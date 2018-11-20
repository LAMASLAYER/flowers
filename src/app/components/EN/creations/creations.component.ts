import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Contact} from '../../../models/contact';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-creations',
  templateUrl: './creations.component.html',
  styleUrls: ['./creations.component.css']
})
export class CreationsComponent implements OnInit {
  router: Router;
  newMail: Contact;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { type: 'BANNER', cols: 2, rows: 1, url: '../../../assets/IMG_0080.JPG', href: 'dashboard' },
        ];
      }

      return [
        { type: 'BANNER', cols: 2, rows: 1, url: '../../../assets/IMG_0080.JPG', href: 'dashboard' },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, router: Router) {
    this.router = router;
    this.newMail = new Contact();
  }
  ngOnInit() {
  }
  goTo(url: string) {
    this.router.navigate(['en/dashboard']);
  }

  public french() {
    localStorage.setItem('fllang', 'fr');
    this.router.navigate(['fr/creations']);
  }

}
