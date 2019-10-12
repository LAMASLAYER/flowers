import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Assets} from '../../models/assets';
import 'rxjs/add/operator/map'
import {Observable} from "rxjs";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {


  public assets: Observable<Assets[]>;
  public assetsCollection: AngularFirestoreCollection<Assets>;
  private _index: number;
  public array: Array<Assets>;

  constructor(public afs: AngularFirestore) {
    this.assets = this.afs.collection('assets').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Assets;
        data.id = a.payload.doc.id;
        return data;
      })
    });
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
    this.afs.collection('assets').doc(input).delete().catch(err => {
      console.log(err);
    })
  }
}

