import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import {Router} from '@angular/router';

@Component({
  selector: 'app-material-dashboard',
  templateUrl: './material-dashboard.component.html',
  styleUrls: ['./material-dashboard.component.css']
})
export class MaterialDashboardComponent {
  router: Router;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { type: 'BANNER', cols: 2, rows: 1, url: '../../../assets/IMG_0080.JPG' },
          { title: 'MES SERVICES', cols: 2, rows: 1,
            url: '../../../assets/IMG_0121.JPG', fontSize: 'xx-large', margin: 120, width: 200, href: 'fr/services' },
          { title: 'CRÉATIONS',
            cols: 1,
            rows: 1,
            url: '../../../assets/IMG_0116.JPG',
            fontSize: 'x-large', margin: 100, href: 'fr/creations'},
          { title: 'A PROPOS',
            position: 'left',
            cols: 1,
            rows: 1,
            url: '../../../assets/IMG_0084.JPG', fontSize: 'x-large', margin: 100, href: 'fr/about'},
          { title: 'CONTACT',
            position: 'left',
            cols: 1,
            rows: 1,
            url: '../../../assets/call.jpg', fontSize: 'x-large', margin: 100, href: 'fr/contact'}
        ];
      }

      return [
        { type: 'BANNER', cols: 2, rows: 1, url: '../../../assets/IMG_0080.JPG' },
        { title: 'CRÉATIONS', cols: 1, rows: 1,  url: '../../../assets/IMG_0116.JPG',
          fontSize: 'xx-large', margin: 120, width: 200, href: 'fr/creations' },
        { title: 'MES SERVICES', cols: 1,
          rows: 2,
          url: '../../../assets/IMG_0121.JPG',
          fontSize: 'xx-large', margin: 270, width: 225, href: 'fr/services' },
        { title: 'A PROPOS DE MOI', cols: 1, rows: 2,
          url: '../../../assets/IMG_0084.JPG', fontSize: 'xx-large', margin: 270,
          width: 290, href: 'fr/about' },
        { title: 'CONTACT', cols: 1, rows: 1,
          url: '../../../assets/call.jpg', fontSize: 'xx-large', margin: 120,
          width: 290, href: 'fr/contact' },
      ];
    })
  );

  goTo(url: string) {
    this.router.navigate([url]);
  }
  constructor(private breakpointObserver: BreakpointObserver, router: Router) {
    this.router = router;
  }

  public english() {
    localStorage.setItem('fllang', 'en');
    this.router.navigate(['en/dashboard']);
  }
}
