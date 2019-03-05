import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzEditComponent } from './quizz-edit.component';

describe('QuizzEditComponent', () => {
  let component: QuizzEditComponent;
  let fixture: ComponentFixture<QuizzEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
