import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { GoogleMap } from '@angular/google-maps';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  userNickname: string = '';
  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;
  display: google.maps.LatLngLiteral | undefined;
  isDisplay: boolean = true;
  options: google.maps.MapOptions = {
    disableDefaultUI: true
  };
  currentPositionMarkerOption: google.maps.MarkerOptions = {
    animation: google.maps.Animation.DROP,
    icon: {
      url: "assets/icon.png",
      scaledSize: new google.maps.Size(48, 48)
    },
    opacity: 0.6,
  };

  constructor(
    private storage: Storage,
    private httpService: HttpService,
  ) { }

  ngOnInit() {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.storage.get('userNickname').then((val) => {
      if (val) {
        this.userNickname = val;
      }
      if (this.userNickname == 'nakano') {
        this.center = {
          lat: 35.707268,
          lng: 139.663738,
        };
        this.isDisplay = true;
        this.zoom = 14;
      } else {
        this.getUserLocation();
      }
    });
  }

  getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.isDisplay = true;
      });
      this.zoom = 14;
    }
  }

  // moveMap(event: google.maps.MapMouseEvent | null) {
  //   this.center = (event?.latLng?.toJSON());
  // }

  // move(event: google.maps.MapMouseEvent | null) {
  //   this.display = event?.latLng?.toJSON();
  // }

}
