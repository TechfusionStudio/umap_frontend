import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-frame',
  templateUrl: './signup-frame.component.html',
  styleUrls: ['./signup-frame.component.scss'],
})
export class SignupFrameComponent  implements OnInit {
  email: string = '';
  password: string = '';
  verificationCode: string = '';
  errorMessage: string = '';
  showConfirmationForm: boolean = false; // 確認フォームの表示制御用フラグ

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {}

  signUp() {
    this.showConfirmationForm = true;
  }

  confirmAccount(code: string) {
    this.router.navigate(['/login']); // アカウント確認後にログインページへリダイレクト
  }
}
