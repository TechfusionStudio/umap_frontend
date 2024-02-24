import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  userNickname: string = '';
  center: google.maps.LatLngLiteral = {
    lat: 35.707268,
    lng: 139.663738,
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 10;
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

  nearItems: {[key: string]: google.maps.LatLngLiteral | any}[] = [];
  nearItemsDataValues: any[] = [];
  nearItemsDataKeys: string[] = [];
  nearItemsIsAbstractData: any[] = [];
  nearItemPositionsMarkerOption: google.maps.MarkerOptions = {
    animation: google.maps.Animation.DROP,
    opacity: 0.8,
  };
  currentItemDataValues: { [key: string]: any } = {};
  currentItemDataKeys: string[] = [];
  currentItemsIsAbstractData: { [key: string]: boolean } = {};
  currentPosition: google.maps.LatLngLiteral | undefined;

  filters: { [key: string]: boolean } = {
    "spacious": false,
    "facility": false,
    "equipment": false,
  };
  fill_filters: { [key: string]: string } = {
    "spacious": "outline",
    "facility": "outline",
    "equipment": "outline",
  };


  constructor(
    private storage: Storage,
    private httpService: HttpService,
    private router: Router,
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
        this.getNearItems();
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
        this.zoom = 14;
        this.getNearItems();
      });
    }
  }

  getNearItems = () => {
    const path = `near_items?organization_id=nakano_test&latitude=${this.center.lat}&longitude=${this.center.lng}`;
    const url = environment.apiEndpoint + path;

    this.httpService.httpGet(url).subscribe({
      next: (data) => {
        console.log(data);
        const items = data['items'];
        const organizationIsAbstractData = data['organization_is_abstract_data'];
        items.forEach((item: any) => {
          if (item.is_abstract_data === null) {
            this.nearItems.push({
              "position": {
                lat: item.data_values["緯度"],
                lng: item.data_values["経度"],
              },
              "dataValues": item.data_values,
              "isAbstractData": organizationIsAbstractData,
            });
          } else {
            this.nearItems.push({
              "position": {
                lat: item.data_values["緯度"],
                lng: item.data_values["経度"],
              },
              "dataValues": item.data_values,
              "isAbstractData": item.is_abstract_data,
            });
          }
        });
        this.nearItemsDataKeys = Object.keys(this.nearItems[0]["dataValues"]);
        this.zoom = 16;
        console.log(this.nearItems, this.nearItemsDataKeys);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addMarker = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      this.markerPositions.push(event.latLng.toJSON());
    }
  }

  openInfoWindow(marker: MapMarker, index: number) {
    this.currentItemDataValues = this.nearItems[index]["dataValues"];
    this.currentItemDataKeys = Object.keys(this.nearItems[index]["dataValues"]);
    this.currentItemsIsAbstractData = this.nearItems[index]["isAbstractData"];
    this.currentPosition = this.nearItems[index]["position"];
    this.infoWindow?.open(marker);
  }

  toggleFilter = (filter: string) => {
    this.filters[filter] = !this.filters[filter];
    if (this.filters[filter]) {
      this.fill_filters[filter] = "solid";
    } else {
      this.fill_filters[filter] = "outline";
    }
    console.log(this.filters);
    this.getFilteredItems();
  }

  getFilteredItems = () => {
    this.nearItems = [];
    this.nearItemsDataKeys = [];

    const spaciousInt = this.filters["spacious"] ? 1 : 0;
    const facilityInt = this.filters["facility"] ? 1 : 0;
    const equipmentInt = this.filters["equipment"] ? 1 : 0;
    const path = `recommend_items?organization_id=nakano_test&latitude=${this.center.lat}&longitude=${this.center.lng}&spacious=${spaciousInt}&facility=${facilityInt}&equipment=${equipmentInt}`;
    const url = environment.apiEndpoint + path;

    this.httpService.httpGet(url).subscribe({
      next: (data) => {
        console.log(data);
        const items = data['items'];
        const organizationIsAbstractData = data['organization_is_abstract_data'];
        items.forEach((item: any) => {
          if (item.is_abstract_data === null) {
            this.nearItems.push({
              "position": {
                lat: item.data_values["緯度"],
                lng: item.data_values["経度"],
              },
              "dataValues": item.data_values,
              "isAbstractData": organizationIsAbstractData,
            });
          } else {
            this.nearItems.push({
              "position": {
                lat: item.data_values["緯度"],
                lng: item.data_values["経度"],
              },
              "dataValues": item.data_values,
              "isAbstractData": item.is_abstract_data,
            });
          }
        });
        this.nearItemsDataKeys = Object.keys(this.nearItems[0]["dataValues"]);

        this.zoom = 14;
        console.log(this.nearItems, this.nearItemsDataValues);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  clickDetail = async (
    nearItemsDataValues: { [key: string]: any },
    nearItemsDataKeys: string[],
  ) => {
    await this.storage.set('nearItemsDataValues', JSON.stringify(nearItemsDataValues));
    await this.storage.set('nearItemsDataKeys', JSON.stringify(nearItemsDataKeys));
    this.router.navigate([`/item/${nearItemsDataValues["item_id"]}`]);
  }
}
