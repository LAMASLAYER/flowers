import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Album} from '../../../models/album'
import {Assets} from '../../../models/assets'

@Component({
  selector: 'app-wedding',
  templateUrl: './wedding.component.html',
  styleUrls: ['./wedding.component.css']
})
export class WeddingComponent implements OnInit {

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

  private http: HttpClient;
  private router: Router;
  public albums = new Array<Assets>();
  public currentAlbum = new Array<Assets>();
  public albumOpened: boolean;

  constructor(private breakpointObserver: BreakpointObserver, router: Router, http: HttpClient) {
    this.router = router;
    this.http = http;
  }

  ngOnInit() {
    this.http.get('https://pathfinderappfinder.herokuapp.com/album/category/wedding').subscribe(
      (albums: Array<Album>) => {
        for(let i = 0; i < albums.length; i++) {
          this.http.get('https://pathfinderappfinder.herokuapp.com/assets/category/wedding/album/' + albums[i].album).subscribe(
            (assets: Array<Assets>) => {
              this.albums.push(assets[Math.floor(Math.random() * assets.length)]);
            }
          )
        }
      }
    )
  }


 public openAlbum(album: string) {
  console.log('hello');
  return this.http.get('https://pathfinderappfinder.herokuapp.com/assets/category/wedding/album/' + album).subscribe(
    (assets: Array<Assets>) => {
      console.log(assets)
      this.currentAlbum = assets;
      this.albumOpened = true;
    }
  )
 }
}
