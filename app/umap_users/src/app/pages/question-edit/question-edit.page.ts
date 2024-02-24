import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.page.html',
  styleUrls: ['./question-edit.page.scss'],
})
export class QuestionEditPage implements OnInit {
  questionTitle: string = '';
  questionText: string = '';
  itemId: string | null = '';
  userNickname: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private storage: Storage,
  ) {
    this.itemId = this.activatedRoute.snapshot.paramMap.get('item_id');
  }

  ngOnInit() {
    this.init();
  }

  init = async () => {
    await this.storage.create();
    this.storage.get('userNickname').then((val) => {
      if (val) {
        this.userNickname = val;
        console.log(this.userNickname);
      }
    });
  };

  submitQuestion = () => {
    const path = "question_prime/" + this.itemId;
    const url = environment.apiEndpoint + path;

    const body = {
      question_user: this.userNickname, // 実際のアプリでは動的にユーザ名を取得
      question_title: this.questionTitle,
      question_text: this.questionText,
    };

    this.http.post(url, body).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigateByUrl(`/item/${this.itemId}`);
        },
        error: (error) => console.error(error)
      });
  }

}
