import { Component, OnInit, Input, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import {Assets} from '../../models/assets';
import {AssetHandler} from '../../models/asset-handler';

@Component({
  selector: 'app-uploader',
  templateUrl: 'uploader.component.html'
})
export class UploaderComponent implements OnInit {

  @Input()
  responses: Array<any>;

  private hasBaseDropZoneOver = false;
  public uploader: FileUploader;
  private title: string;
  public urls: Array<string>;
  public category: string;
  public width: number;
  public height: number;
  public assetHandler: Array<AssetHandler>;

  constructor(
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient
  ) {
    this.responses = [];
    this.assetHandler = new Array<AssetHandler>();
  }

  ngOnInit(): void {
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
    asset = new class implements Assets {
      category: string;
      id: number;
      url: string;
      orientation: string;
    };
    for (let i = 0; i < this.assetHandler.length; i++) {
      if (this.assetHandler[i].width < this.assetHandler[i].height) {
        asset.orientation = 'portrait';
      } else {
        asset.orientation = 'paysage';
      }
      asset.url = this.assetHandler[i].url;
      asset.category = this.getCategory();
      asset.id = null;
      console.log(asset);
      this.http.post('https://pathfinderappfinder.herokuapp.com/assets/post', asset).subscribe(
        res => {
          if (i === this.assetHandler.length) {
            alert('Upload terminé.');
            this.responses = [];
          }
        }
      );
    }
    this.assetHandler = [];
  }

  public getCategory(): string {
    return this.category;
  }
  public setCategory(category: string) {
    console.log(category);
    this.category = category;
  }
}