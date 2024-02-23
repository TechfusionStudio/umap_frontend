import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-frame',
  templateUrl: './login-frame.component.html',
  styleUrls: ['./login-frame.component.scss'],
})
export class LoginFrameComponent  implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // エラーメッセージを格納するためのプロパティ

  constructor(
    private router: Router,
    ) {}

  ngOnInit() {}

  login() {
    this.router.navigate(['/']); // ログイン成功後にホームページへリダイレクト
  }

}
