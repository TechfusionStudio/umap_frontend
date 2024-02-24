import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.page.html',
  styleUrls: ['./answer.page.scss'],
})
export class AnswerPage implements OnInit {
  answerText: string = '';
  questionId: string | null = '';
  userNickname: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private storage: Storage,
  ) {
    this.questionId = this.activatedRoute.snapshot.paramMap.get('question_id');
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

  submitAnswer = () => {
    const path = "answer/" + this.questionId;
    const url = environment.apiEndpoint + path;

    const body = {
      question_id: this.questionId, // 実際のアプリでは動的にユーザ名を取得
      answer_user: this.userNickname,
      answer_text: this.answerText,
    };

    this.http.post(url, body).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigateByUrl(`/question/${this.questionId}`);
        },
        error: (error) => console.error(error)
      });
  }

}
