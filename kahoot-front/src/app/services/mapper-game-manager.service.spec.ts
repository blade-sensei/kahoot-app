import { TestBed } from '@angular/core/testing';

import { MapperGameManagerService } from './mapper-game-manager.service';

describe('MapperGameManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapperGameManagerService = TestBed.get(MapperGameManagerService);
    expect(service).toBeTruthy();
  });
});
