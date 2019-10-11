import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Assets} from '../../models/assets';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {


  router: Router;
  private http: HttpClient;
  public assets;
  private _index: number;
  public array: Array<Assets>;
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
    this.assets = this.afs.collection('assets').valueChanges();
  }
  ngOnInit() {
    this.getAssets().subscribe(
      (data: Array<Assets>) => {
        this.array = data;
        console.log(this.array);
      }
    );
    this._index = 0;

  }

  get index(): number {
    return this._index;
  }

  set index(value: number) {
    this._index = value;
  }

  getAssets() {
    return this.assets;
  }

  delete(input: string) {
    // this.afs.collection('assets').doc(//TODO).delete().then(function() {
    //   console.log('Document successfully deleted!');
    // }).catch(function(error) {
    //   console.error('Error removing document: ', error);
    // });
  }
}
