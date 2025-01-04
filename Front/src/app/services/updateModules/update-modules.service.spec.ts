import { TestBed } from '@angular/core/testing';

import { UpdateModulesService } from './update-modules.service';

describe('UpdateModulesService', () => {
  let service: UpdateModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
