import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Album} from '../../../models/album';
import {Assets} from '../../../models/assets';

@Component({
  selector: 'app-funerals',
  templateUrl: './funerals.component.html',
  styleUrls: ['./funerals.component.css']
})

export class FuneralsComponent implements OnInit {

  private http: HttpClient;
  public assets = new Array<Assets>();

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

  constructor(private breakpointObserver: BreakpointObserver, http: HttpClient) {
    this.http = http;
  }

  ngOnInit() {
    this.http.get('https://pathfinderappfinder.herokuapp.com/album/category/funerals').subscribe(
      (res: Array<Album>) => {
        for (let i = 0; i < res.length; i++) {
          this.http.get('https://pathfinderappfinder.herokuapp.com/assets/category/funerals/album/' + res[i].album).subscribe(
            (assets: Array<Assets>) => {
              this.assets.push(assets[Math.floor(Math.random() * assets.length)]);
            }
          );
        }
        console.log(this.assets);
      }
    );
  }

}
