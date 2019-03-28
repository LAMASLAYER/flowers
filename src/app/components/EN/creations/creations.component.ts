import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Contact} from '../../../models/contact';
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
  newMail: Contact;
  public menu: boolean;
  public barcelone: boolean;
  public mariage: boolean;
  private http: HttpClient;
  private weddingUrls: Array<Assets>;
  private funeralsUrls: Array<Assets>;
  public loading = false;
  public cards: any;


  public initBoard(wedding: Assets, funerals: Assets) {
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
            return [
              { type: 'BANNER', cols: 2, rows: 1, url: '../../../assets/IMG_0080.JPG', href: 'dashboard' },
              { title: 'WEDDINGS', cols: 1, rows: 1,
                url: wedding.url, fontSize: 'xx-large', margin: 120, width: 200 },
              { title: 'FUNERALS', cols: 1, rows: 1,
                url: funerals.url, fontSize: 'xx-large', margin: 120, width: 200 },
            ];
          }

          return [
            { type: 'BANNER', cols: 2, rows: 1, url: '../../../assets/IMG_0080.JPG', href: 'dashboard' },
            { title: 'WEDDINGS', cols: 1,
              rows: 2,
              url: wedding.url,
              fontSize: 'xx-large', margin: 100, width: 225 },
            { title: 'FUNERALS', cols: 1,
              rows: 2,
              url: funerals.url,
              fontSize: 'xx-large', margin: 100, width: 225 },
          ];
      })
    );
  }

  /** Based on the screen size, switch from standard to one column per row */



  constructor(private breakpointObserver: BreakpointObserver, router: Router, http: HttpClient) {
    this.router = router;
    this.newMail = new Contact();
    this.http = http;
  }

  ngOnInit() {
    let tempAsset = new Assets();

    let tempAsset2 = new Assets();
    this.loading = true;
    this.menu = false;
    this.mariage = true;
    this.http.get('https://pathfinderappfinder.herokuapp.com/assets/category/wedding').subscribe(
      (data: Array<Assets>) => {
        this.weddingUrls = data;
        tempAsset = this.weddingUrls[Math.floor(Math.random() * this.weddingUrls.length)];
        console.log(tempAsset);
      }
    );
    this.http.get('https://pathfinderappfinder.herokuapp.com/assets/category/funerals').subscribe(
      (funerals: Array<Assets>) => {
        this.funeralsUrls = funerals;
        tempAsset2 = this.funeralsUrls[Math.floor(Math.random() * this.funeralsUrls.length)];
        console.log(tempAsset2);
        this.initBoard(tempAsset, tempAsset2);
      }
    );
    this.loading = false;
  }
  goTo(url: string) {
    this.router.navigate(['en/dashboard']);
  }

  public french() {
    localStorage.setItem('fllang', 'fr');
    this.router.navigate(['fr/creations']);
  }

}
