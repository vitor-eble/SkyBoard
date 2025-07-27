import { TestBed } from '@angular/core/testing';

import { SkyblockService } from './skyblock.service';

describe('SkyblockService', () => {
  let service: SkyblockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkyblockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
