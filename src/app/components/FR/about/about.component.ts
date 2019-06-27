import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  router: Router;

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
  }
  ngOnInit() {
  }
  goTo(url: string) {
    this.router.navigate(['fr/dashboard']);
  }

  public english() {
    localStorage.setItem('fllang', 'en');
    this.router.navigate(['en/about']);
  }

}
