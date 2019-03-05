import { TestBed } from '@angular/core/testing';

import { HookManagerService } from './hook-manager.service';

describe('HookManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HookManagerService = TestBed.get(HookManagerService);
    expect(service).toBeTruthy();
  });
});
