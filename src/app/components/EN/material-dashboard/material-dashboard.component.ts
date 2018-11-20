import {Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import {Router} from '@angular/router';

@Component({
  selector: 'app-material-dashboard',
  templateUrl: './material-dashboard.component.html',
  styleUrls: ['./material-dashboard.component.css']
})
export class MaterialDashboardComponent implements OnInit {
  router: Router;


  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { type: 'BANNER', cols: 2, rows: 1, url: '../../../assets/IMG_0080.JPG' },
          { title: 'MY SERVICES', cols: 2, rows: 1,
            url: '../../../assets/IMG_0121.JPG', fontSize: 'xx-large', margin: 120, width: 200, href: 'en/services' },
          { title: 'CREATIONS',
            cols: 1,
            rows: 1,
            url: '../../../assets/IMG_0116.JPG',
            fontSize: 'x-large', margin: 100, href: 'en/creations'},
          { title: 'ABOUT ME',
            position: 'left',
            cols: 1,
            rows: 1,
            url: '../../../assets/IMG_0084.JPG', fontSize: 'x-large', margin: 100, href: 'en/about'},
          { title: 'CONTACT',
            position: 'left',
            cols: 1,
            rows: 1,
            url: '../../../assets/call.jpg', fontSize: 'x-large', margin: 100, href: 'en/contact'}
        ];
      }

      return [
        { type: 'BANNER', cols: 2, rows: 1, url: '../../../assets/IMG_0080.JPG' },
        { title: 'CREATIONS', cols: 1, rows: 1,  url: '../../../assets/IMG_0116.JPG',
          fontSize: 'xx-large', margin: 120, width: 200, href: 'en/creations' },
        { title: 'SERVICES', cols: 1,
          rows: 2,
          url: '../../../assets/IMG_0121.JPG',
          fontSize: 'xx-large', margin: 270, width: 225, href: 'en/services' },
        { title: 'ABOUT ME', cols: 1, rows: 2,
          url: '../../../assets/IMG_0084.JPG', fontSize: 'xx-large', margin: 270,
          width: 290, href: 'en/about' },
        { title: 'CONTACT', cols: 1, rows: 1,
          url: '../../../assets/call.jpg', fontSize: 'xx-large', margin: 120,
          width: 290, href: 'en/contact' },
      ];
    })
  );

  ngOnInit() {
    if (localStorage.getItem('fllang') !== 'fr') {
      this.router.navigate(['en/dashboard']);
    } else {
      this.router.navigate(['fr/dashboard']);
    }
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }
  constructor(private breakpointObserver: BreakpointObserver, router: Router) {
    this.router = router;
  }

  public french() {
    localStorage.setItem('fllang', 'fr');
    this.router.navigate(['fr/dashboard']);
  }
}
