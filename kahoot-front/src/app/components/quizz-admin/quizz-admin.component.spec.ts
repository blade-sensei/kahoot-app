import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzAdminComponent } from './quizz-admin.component';

describe('QuizzAdminComponent', () => {
  let component: QuizzAdminComponent;
  let fixture: ComponentFixture<QuizzAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
