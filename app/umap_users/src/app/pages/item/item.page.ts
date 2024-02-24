import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  nearItemsDataValues: { [key: string]: any } = {};
  nearItemsDataKeys: string[] = [];
  itemId: string | null = '';
  questions: {[key: string]: any}[] = [];

  constructor(
    private storage: Storage,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {
    this.itemId = this.activatedRoute.snapshot.paramMap.get('item_id');
  }

  ngOnInit() {
    this.init();
  }

  ionViewDidEnter() {
    this.indexQuestions();
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

  indexQuestions = () => {
    const path = `questions?item_id=${this.itemId}`;
    const url = environment.apiEndpoint + path;

    this.httpService.httpGet(url).subscribe({
      next: (response) => {
        console.log(response);
        this.questions = response['questions'];
      },
      error: (error) => console.error(error),
    });
  };
}
