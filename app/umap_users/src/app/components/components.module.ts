import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsModule } from '@angular/google-maps';

import { LoginFrameComponent } from './auth/login-frame/login-frame.component';
import { SignupFrameComponent } from './auth/signup-frame/signup-frame.component';
import { SignupConfirmFrameComponent } from './auth/signup-confirm-frame/signup-confirm-frame.component';
import { MapComponent } from './map/map.component';
import { WaitingLoaderComponent } from './loader/waiting-loader/waiting-loader.component';

@NgModule({
  declarations: [
    LoginFrameComponent,
    SignupFrameComponent,
    SignupConfirmFrameComponent,
    MapComponent,
    WaitingLoaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleMapsModule,
  ],
  exports: [
    LoginFrameComponent,
    SignupFrameComponent,
    SignupConfirmFrameComponent,
    MapComponent,
    WaitingLoaderComponent,
  ]
})
export class ComponentsModule { }
