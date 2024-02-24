import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { env } from 'process';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  questionId: number | null = null;
  questionTitle: string = '';
  questionText: string = '';
  answers: {[key: string]: number | string}[] = [];
  noneAnswer: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private router: Router,
  ) {
    this.questionId = parseInt(this.activatedRoute.snapshot.paramMap.get('question_id') || '', undefined);
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    if (this.questionId) {
      this.getQuestionDetails();
    }
  }
  getQuestionDetails() {
    const path: string = `question_prime/${this.questionId}`;
    const url: string = environment.apiEndpoint + path;

    this.httpService.httpGet(url).subscribe({
      next: (response: any) => {
        console.log('Response:', response);
        this.questionTitle = response.question_title;
        this.questionText = response.question_text;
        this.answers = response.answers;

        this.noneAnswer = this.answers.length === 1 && this.answers[0]["answer_user"] === null && this.answers[0]["answer_text"] === null
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }

  formattedQuestionText = () => {
    return this.questionText.replace(/\n/g, '<br>');
  }

  // answer/:question_id に遷移する関数
  goToAnswerPage = () => {
    this.router.navigate([`/answer/${this.questionId}`]);
  }
}
