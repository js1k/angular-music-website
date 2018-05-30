import { CarouseComponent } from './one/carouse/carouse.component';


import { environment } from '../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { AcreatrequestService } from './allservices/acreatrequest.service';
import { PlayingService } from './allservices/playing.service';
import { AesrsaService } from './allservices/aesrsa.service';
import { AppRoutes } from './app.routing';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { ProMusicComponent } from './play/proMusic/proMusic.component';
import { ProVolComponent } from './play/proVol/proVol.component';
import { PlayComponent } from './play/play.component';
import { SearchMusicService } from './allservices/searchMusic.service';

// import { ShareModule } from './share/share.module';

// import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    ProVolComponent,
    ProMusicComponent,
    CarouseComponent,
 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    AppRoutes,
    // ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [
    AesrsaService,
    AcreatrequestService,
    PlayingService,
    SearchMusicService,
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


