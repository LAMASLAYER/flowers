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
  { path: 'en/contact', component: ContactEnglish}
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
    CreationsEnglish
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
    RouterModule.forRoot(routes),
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'fleurslesale', upload_preset: 'canh3gtz'}),
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
