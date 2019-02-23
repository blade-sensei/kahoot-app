import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScreenAdminComponent } from './game-screen-admin.component';

describe('GameScreenAdminComponent', () => {
  let component: GameScreenAdminComponent;
  let fixture: ComponentFixture<GameScreenAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameScreenAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameScreenAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
