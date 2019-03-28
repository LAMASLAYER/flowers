import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Assets} from '../../../models/assets';

@Component({
  selector: 'app-creations',
  templateUrl: './creations.component.html',
  styleUrls: ['./creations.component.css']
})
export class CreationsComponent implements OnInit {
  router: Router;
  public menu: boolean;
  private http: HttpClient;
  public weddingUrl: string;
  public funeralsUrl: string;


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

  constructor(private breakpointObserver: BreakpointObserver, router: Router, http: HttpClient) {
    this.router = router;
    this.http = http;
  }
  ngOnInit() {
    this.http.get('https://pathfinderappfinder.herokuapp.com/assets/category/wedding').subscribe(
      (data: Array<Assets>) => {
        this.weddingUrl =  data[Math.floor(Math.random() * data.length)]['url'];
      }
    );
    this.http.get('https://pathfinderappfinder.herokuapp.com/assets/category/funerals').subscribe(
      (data: Array<Assets>) => {
        this.funeralsUrl = data[Math.floor(Math.random() * data.length)]['url'];
      }
    );
  }
  goTo(url: string) {
    this.router.navigate(['en/dashboard']);
  }

  public french() {
    localStorage.setItem('fllang', 'fr');
    this.router.navigate(['fr/creations']);
  }

}
