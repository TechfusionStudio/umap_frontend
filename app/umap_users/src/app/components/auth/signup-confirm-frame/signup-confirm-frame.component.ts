import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup-confirm-frame',
  templateUrl: './signup-confirm-frame.component.html',
  styleUrls: ['./signup-confirm-frame.component.scss'],
})
export class SignupConfirmFrameComponent  implements OnInit {
  code: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router, 
    private route: ActivatedRoute
  ) {
    // URLからemailパラメータを取得する場合（オプション）
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
  }

  ngOnInit() {}

  confirmAccount() {
    this.router.navigate(['/login']);
  }
}
