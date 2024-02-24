import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionEditPage } from './question-edit.page';

describe('QuestionEditPage', () => {
  let component: QuestionEditPage;
  let fixture: ComponentFixture<QuestionEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QuestionEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
