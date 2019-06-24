import { Component, OnInit, Input, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import {Assets} from '../../models/assets';
import {AssetHandler} from '../../models/asset-handler';
import {Album} from '../../models/album';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-uploader',
  templateUrl: 'uploader.component.html'
})
export class UploaderComponent implements OnInit {

  @Input()
  responses: Array<any>;

  public hasBaseDropZoneOver = false;
  public uploader: FileUploader;
  private title: string;
  public urls: Array<string>;
  public category: string;
  public width: number;
  public height: number;
  public assetHandler: Array<AssetHandler>;
  public uploaded: boolean;
  public albums;
  public albumsCol: AngularFirestoreCollection<Album>;
  public newAlbum = new Album();
  public album: string;
  public itemsCollection: AngularFirestoreCollection<Assets>;
  public items;

  constructor(
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient,
    public afs: AngularFirestore
  ) {
    this.setCategory('');
    this.responses = [];
    this.assetHandler = new Array<AssetHandler>();
    this.items = this.afs.collection('assets').valueChanges();
    this.albums = this.afs.collection('albums', ref => ref.where('category', '==', '')).valueChanges();
  }


  ngOnInit(): void {

    this.uploaded = false;
    // Create the file uploader, wire it to upload to your account
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      // Add built-in and custom tags for displaying the uploaded photo in the list
      let tags = 'myphotoalbum';
      if (this.title) {
        form.append('context', `photo=${this.title}`);
        tags = `myphotoalbum,${this.title}`;
      }
      // Upload to a custom folder
      // Note that by default, when uploading via the API, folders are not automatically created in your Media Library.
      // In order to automatically create the folders based on the API requests,
      // please go to your account upload settings and set the 'Auto-create folders' option to enabled.
      form.append('folder', 'angular_sample');
      // Add custom tags
      form.append('tags', tags);
      // Add file to upload
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    // Insert or update an entry in the responses array
    const upsertResponse = fileItem => {
      this.uploaded = true;
      // Run the update in a custom zone since for some reason change detection isn't performed
      // as part of the XHR request to upload the files.
      // Running in a custom zone forces change detection
      this.zone.run(() => {
        // Update an existing entry if it's upload hasn't completed yet
        // Find the id of an existing item
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          // Update existing item with new data
          this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
        } else {
          // Create new response
          this.responses.push(fileItem);
        }
        if (fileItem.data.url !== undefined) {
          const tempHandler = new AssetHandler();
          tempHandler.height =  fileItem.data.height;
          tempHandler.width = fileItem.data.width;
          tempHandler.url = fileItem.data.url;
          this.assetHandler.push(tempHandler);
          return this.assetHandler;
        }
      });
    };

    // Update model on completion of uploading a file
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
      upsertResponse(
        {
          file: item.file,
          status,
          data: JSON.parse(response),
        }
      );

    // Update model on upload progress event
    this.uploader.onProgressItem = (fileItem: any, progress: any) =>
      upsertResponse(
        {
          file: fileItem.file,
          progress,
          data: {}
        }
      );
  }

  updateTitle(value: string) {
    this.title = value;
  }

  // Delete an uploaded image
  // Requires setting "Return delete token" to "Yes" in your upload preset configuration
  // See also https://support.cloudinary.com/hc/en-us/articles/202521132-How-to-delete-an-image-from-the-client-side-
  deleteImage = function (data: any, index: number) {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/delete_by_token`;
    const headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
    const options = { headers: headers };
    const body = {
      token: data.delete_token
    };
    this.http.post(url, body, options).subscribe(response => {
      console.log(`Deleted image - ${data.public_id} ${response.result}`);
      // Remove deleted item for responses
      this.responses.splice(index, 1);
    });
  };

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getFileProperties(fileProperties: any) {
    // Transforms Javascript Object to an iterable to be used by *ngFor
    if (!fileProperties) {
      return null;
    }
    return Object.keys(fileProperties).map((key) => ({ 'key': key, 'value': fileProperties[key] }));
  }

  protected export() {
    for (let j = 0; j < this.responses.length; j++) {
      if (this.responses[j].status !== 200) {
        alert('L\'upload n\'est pas terminé.');
        return;
      }
    }
    console.log('ok');
    let asset: Assets;
    asset = new Assets();
    for (let i = 0; i < this.assetHandler.length; i++) {
      if (this.assetHandler[i].width < this.assetHandler[i].height) {
        asset.orientation = 'portrait';
      } else {
        asset.orientation = 'paysage';
      }
      asset.url = this.assetHandler[i].url;
      asset.category = this.getCategory();
      asset.id = null;
      asset.album = this.getAlbum();
      console.log(asset);
      this.afs.collection('assets').add(
        {
          'id':asset.id,
          'url':asset.url,
          'category':asset.category,
          'album':asset.album,
          'orientation': asset.orientation
        }
      )
    }
    this.assetHandler = [];
    this.uploaded = false;
  }

  public getCategory(): string {
    return this.category;
  }
  public setCategory(category: string) {
    console.log(category);
    this.category = category;
  }

  public getAlbum(): string {
    return this.album;
  }
  public setAlbum(album: string) {
    console.log(album);
    this.album = album;
  }

  public saveAlbum() {
    console.log(this.newAlbum);
    console.log(this.newAlbum.album);
    if (this.newAlbum.album !== '' && this.newAlbum.album !== undefined) {
      this.newAlbum.albumId = null;
      this.newAlbum.category = this.getCategory();
      this.afs.collection('albums').add({
        'id':this.newAlbum.albumId,
        'category':this.newAlbum.category,
        'album':this.newAlbum.album
      })
    } else {
      alert('Impossible de créer un album sans nom.');
    }
  }

  public getAlbumByCategory() {
    const value = this.getCategory();
    this.albums = this.afs.collection('albums', ref => ref.where('category', '==', value)).valueChanges();
  }
}
