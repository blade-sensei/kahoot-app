import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonQuizzAddComponent } from './button-quizz-add.component';

describe('ButtonQuizzAddComponent', () => {
  let component: ButtonQuizzAddComponent;
  let fixture: ComponentFixture<ButtonQuizzAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonQuizzAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonQuizzAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
