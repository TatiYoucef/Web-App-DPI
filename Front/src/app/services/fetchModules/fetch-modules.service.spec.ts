import { TestBed } from '@angular/core/testing';

import { FetchModulesService } from './fetch-modules.service';

describe('FetchModulesService', () => {
  let service: FetchModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
