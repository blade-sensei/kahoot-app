import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWatingRoomComponent } from './game-wating-room.component';

describe('GameWatingRoomComponent', () => {
  let component: GameWatingRoomComponent;
  let fixture: ComponentFixture<GameWatingRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameWatingRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameWatingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
