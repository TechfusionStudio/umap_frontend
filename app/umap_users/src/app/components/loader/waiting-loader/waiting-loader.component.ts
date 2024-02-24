import { Component, OnInit } from '@angular/core';

import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-waiting-loader',
  templateUrl: './waiting-loader.component.html',
  styleUrls: ['./waiting-loader.component.scss'],
})
export class WaitingLoaderComponent  implements OnInit {
  constructor(
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.showLoading();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 3000,
    });

    loading.present();
  }


}
