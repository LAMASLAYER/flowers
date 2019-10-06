import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Assets} from '../../../models/assets';
import {AngularFirestore} from '@angular/fire/firestore';


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
  public weddingOrientation: string;
  private eventOrientations: string;
  public funeralsOrientation: string;
  public orientationRequest: string;
  public wedding;
  public funerals;
  public events: any;
  public eventsUrl: string;

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

  constructor(private breakpointObserver: BreakpointObserver, router: Router, http: HttpClient, public afs: AngularFirestore) {
    this.router = router;
    this.http = http;
    this.wedding = this.afs.collection('assets', ref => ref.where('category', '==', 'wedding').where('orientation', '==', 'paysage')).valueChanges();
  }
  ngOnInit() {
    this.getWedding().subscribe(
      (data: Array<Assets>) => {
        const randomData = data[Math.floor(Math.random() * data.length)];
        this.weddingUrl =  randomData.url;
        this.weddingOrientation = randomData.orientation;
        if(this.weddingOrientation == 'portrait') {
          this.orientationRequest = 'portrait'
        }else {
          this.orientationRequest = 'paysage'
        }
        this.setFunerals(this.afs.collection('assets', ref => ref.where('category', '==', 'funerals').where('orientation', '==', 'paysage')).valueChanges())
        this.getFunerals().subscribe(
          (data2: Array<Assets>) => {
            const randomData2 = data2[Math.floor(Math.random() * data2.length)];
            this.funeralsUrl = randomData2.url;
            this.funeralsOrientation = randomData2.orientation;
          }
        );

        this.setEvents(this.afs.collection('assets', ref => ref.where('category', '==', 'events').where('orientation', '==', 'paysage')).valueChanges())
        this.getEvents().subscribe(
          (data2: Array<Assets>) => {
            const randomData2 = data2[Math.floor(Math.random() * data2.length)];
            this.eventsUrl = randomData2.url;
            this.eventOrientations = randomData2.orientation;
          }
        );
      }
    );

  }

  getEvents(){
    return this.events;
  }

  getWedding() {
    return this.wedding;
  }

  getFunerals() {
    return this.funerals;
  }

  setFunerals(funerals) {
    this.funerals = funerals;
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }

  public french() {

  }
  public nothing(){
    localStorage.setItem('enlang', 'en');
    this.router.navigate(['en/creations']);
  }

  private setEvents(events) {
    this.events = events;
  }
}
