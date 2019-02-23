import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerEditorComponent } from './answer-editor.component';

describe('AnswerEditorComponent', () => {
  let component: AnswerEditorComponent;
  let fixture: ComponentFixture<AnswerEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
