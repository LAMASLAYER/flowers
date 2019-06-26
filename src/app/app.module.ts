import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import {MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import { FileUploadModule} from 'ng2-file-upload';
import { MaterialDashboardComponent } from './components/FR/material-dashboard/material-dashboard.component';
import { AboutComponent } from './components/FR/about/about.component';
import { ServicesComponent } from './components/FR/services/services.component';
import { CreationsComponent } from './components/FR/creations/creations.component';
import { ContactComponent } from './components/FR/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent as AboutEnglish } from './components/EN/about/about.component';
import { ContactComponent as ContactEnglish } from './components/EN/contact/contact.component';
import { ServicesComponent as ServicesEnglish } from './components/EN/services/services.component';
import { MaterialDashboardComponent as DashboardEnglish } from './components/EN/material-dashboard/material-dashboard.component';
import { CreationsComponent as CreationsEnglish } from './components/EN/creations/creations.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {NavbarComponent} from './components/navbar/navbar.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { WeddingComponent } from './components/EN/wedding/wedding.component';
import { FuneralsComponent } from './components/EN/funerals/funerals.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FweddingComponent } from './components/FR/fwedding/fwedding.component';
import { FfuneralsComponent } from './components/FR/ffunerals/ffunerals.component';

const routes: Routes = [
  { path: '', redirectTo: 'en/dashboard', pathMatch: 'full' },
  { path: 'fr/dashboard', component: MaterialDashboardComponent },
  { path: 'fr/about', component: AboutComponent},
  { path: 'fr/services', component: ServicesComponent},
  { path: 'fr/creations', component: CreationsComponent},
  { path: 'fr/contact', component: ContactComponent},
  { path: 'en/dashboard', component: DashboardEnglish },
  { path: 'en/about', component: AboutEnglish},
  { path: 'en/services', component: ServicesEnglish},
  { path: 'en/creations', component: CreationsEnglish},
  { path: 'en/contact', component: ContactEnglish},
  { path: 'upload', component: UploaderComponent },
  { path: 'en/creations/wedding', component: WeddingComponent},
  { path: 'en/creations/funerals', component: FuneralsComponent },
  { path: 'fr/creations/wedding', component: FweddingComponent},
  { path: 'fr/creations/funerals', component: FfuneralsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MaterialDashboardComponent,
    AboutComponent,
    ServicesComponent,
    CreationsComponent,
    ContactComponent,
    AboutEnglish,
    ContactEnglish,
    ServicesEnglish,
    DashboardEnglish,
    CreationsEnglish,
    NavbarComponent,
    UploaderComponent,
    WeddingComponent,
    FuneralsComponent,
    FweddingComponent,
    FfuneralsComponent,
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    LayoutModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'fleurslesale', upload_preset: 'canh3gtz'}),
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'fleurslesale'),
    AngularFirestoreModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
