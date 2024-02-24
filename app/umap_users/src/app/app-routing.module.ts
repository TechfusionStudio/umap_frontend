import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'top',
    // redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'menu/:id',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'top',
    loadChildren: () => import('./pages/top/top.module').then( m => m.TopPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'item/:item_id',
    loadChildren: () => import('./pages/item/item.module').then( m => m.ItemPageModule)
  },
  {
    path: 'question/:question_id',
    loadChildren: () => import('./pages/question/question.module').then( m => m.QuestionPageModule)
  },
  {
    path: 'question/edit/:item_id',
    loadChildren: () => import('./pages/question-edit/question-edit.module').then( m => m.QuestionEditPageModule)
  },
  {
    path: 'answer/:question_id',
    loadChildren: () => import('./pages/answer/answer.module').then( m => m.AnswerPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
