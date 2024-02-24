import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  nearItemsDataValues: { [key: string]: any } = {};
  nearItemsDataKeys: string[] = [];

  constructor(
    private storage: Storage,
    private router: Router,
  ) { }

  ngOnInit() {
    this.init();
  }

  init = async () => {
    await this.storage.create();
    this.storage.get('nearItemsDataValues').then((val) => {
      if (val) {
        this.nearItemsDataValues = JSON.parse(val);
        console.log(this.nearItemsDataValues);
      }
    });
    this.storage.get('nearItemsDataKeys').then((val) => {
      if (val) {
        this.nearItemsDataKeys = JSON.parse(val);
        console.log(this.nearItemsDataKeys);
      }
    });
  };

}
