import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlayerJoinComponent } from './game-player-join.component';

describe('GamePlayerJoinComponent', () => {
  let component: GamePlayerJoinComponent;
  let fixture: ComponentFixture<GamePlayerJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePlayerJoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlayerJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
