import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-material-dashboard',
  templateUrl: './material-dashboard.component.html',
  styleUrls: ['./material-dashboard.component.css']
})
export class MaterialDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { type: 'BANNER', cols: 2, rows: 1, url: '../../../assets/IMG_0080.JPG' },
          { title: 'MES SERVICES', cols: 2, rows: 1, url: '../../../assets/IMG_0121.JPG', fontSize: 'xx-large', margin: 120, width: 200 },
          { title: 'CRÉATIONS', cols: 1, rows: 1,  url: '../../../assets/IMG_0116.JPG', fontSize: 'medium', margin: 120, width: 90  },
          { title: 'A PROPOS DE MOI', cols: 1, rows: 1, url: '../../../assets/IMG_0084.JPG', fontSize: 'medium', margin: 120, width: 90 }
        ];
      }

      return [
        { type: 'BANNER', cols: 2, rows: 1, url: '../../../assets/IMG_0080.JPG' },
        { title: 'CRÉATIONS', cols: 1, rows: 1,  url: '../../../assets/IMG_0116.JPG', fontSize: 'xx-large', margin: 120, width: 200 },
        { title: 'MES SERVICES', cols: 1, rows: 2,  url: '../../../assets/IMG_0121.JPG', fontSize: 'xx-large', margin: 270, width: 225 },
        { title: 'A PROPOS DE MOI', cols: 1, rows: 1,  url: '../../../assets/IMG_0084.JPG', fontSize: 'xx-large', margin: 120, width: 290 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
