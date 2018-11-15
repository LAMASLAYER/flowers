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
import { MaterialDashboardComponent } from './components/material-dashboard/material-dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { CreationsComponent } from './components/creations/creations.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: MaterialDashboardComponent },
  { path: 'about', component: AboutComponent},
  { path: 'services', component: ServicesComponent},
  { path: 'creations', component: CreationsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MaterialDashboardComponent,
    AboutComponent,
    ServicesComponent,
    CreationsComponent
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
    FileUploadModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
