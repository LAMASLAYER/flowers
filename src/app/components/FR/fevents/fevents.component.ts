import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Assets} from '../../../models/assets';
import {AngularFirestore} from '@angular/fire/firestore';
import {Album} from '../../../models/album';

@Component({
  selector: 'app-events',
  templateUrl: './fevents.component.html',
  styleUrls: ['./fevents.component.css']
})
export class FeventsComponent implements OnInit {

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
  public wedding;
  public albms;
  constructor(private breakpointObserver: BreakpointObserver, router: Router, http: HttpClient, public afs: AngularFirestore) {
    this.router = router;
    this.http = http;
    this.albms = this.afs.collection('albums', ref => ref.where('category', '==', 'events')).valueChanges();
  }

  ngOnInit() {
    this.getAlbum().subscribe(
      (albums: Array<Album>) => {
        for (let i = 0; i < albums.length; i++) {
          const album = albums[i].album;
          this.setWedding(this.afs.collection
          ('assets', ref => ref.where('category', '==', 'events')
            .where('album', '==', album)
            .where('orientation', '==', 'paysage')).valueChanges());
          console.log(this.getWedding().length);
          this.getWedding().subscribe(
            (assets: Array<Assets>) => {
              this.albums.push(assets[Math.floor(Math.random() * assets.length)]);
            }
          );
        }
      }
    );
  }

  getAlbum() {
    return this.albms;
  }

  setWedding(wedding) {
    this.wedding = wedding;
  }

  getWedding() {
    return this.wedding;
  }

  public openAlbum(album: string) {
    console.log('hello');
    this.setWedding(this.afs.collection('assets', ref => ref
      .where('category', '==', 'events')
      .where('album', '==', album)).valueChanges());
    this.getWedding().subscribe(
      (assets: Array<Assets>) => {
        console.log(assets);
        this.currentAlbum = assets;
        this.albumOpened = true;
      }
    );
  }

  public goBack(): void {
    this.router.navigate(['fr/creations']);
  }
}
