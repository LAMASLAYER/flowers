import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Album} from '../../../models/album'
import {Assets} from '../../../models/assets'
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-funerals',
  templateUrl: './funerals.component.html',
  styleUrls: ['./funerals.component.css']
})
export class FuneralsComponent implements OnInit {

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
  public funerals;
  public albms;
  constructor(private breakpointObserver: BreakpointObserver, router: Router, http: HttpClient, public afs: AngularFirestore) {
    this.router = router;
    this.http = http;
    this.albms = this.afs.collection('albums', ref => ref.where('category', '==', 'funerals')).valueChanges();
  }

  ngOnInit() {
    this.getAlbum().subscribe(
      (albums: Array<Album>) => {
        for(let i = 0; i < albums.length; i++) {
          let album = albums[i].album;
          this.setFunerals(this.afs.collection('assets', ref => ref.where('category', '==', 'funerals').where('album', '==', album)).valueChanges());
          this.getFunerals().subscribe(
            (assets: Array<Assets>) => {
              this.albums.push(assets[Math.floor(Math.random() * assets.length)]);
            }
          )
        }
      }
    )
  }

  getAlbum() {
    return this.albms
  }

  setFunerals(funerals) {
    this.funerals = funerals
  }

  getFunerals() {
    return this.funerals
  }

  public openAlbum(album: string) {
    this.setFunerals(this.afs.collection('assets', ref => ref.where('category', '==', 'funerals').where('album', '==', album)).valueChanges());
    this.getFunerals().subscribe(
      (assets: Array<Assets>) => {
        console.log(assets);
        this.currentAlbum = assets;
        this.albumOpened = true;
      }
    )
  }

}
