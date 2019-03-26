import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameQuizzBoardComponent } from './game-quizz-board.component';

describe('GameQuizzBoardComponent', () => {
  let component: GameQuizzBoardComponent;
  let fixture: ComponentFixture<GameQuizzBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameQuizzBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameQuizzBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
