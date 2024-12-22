import { TestBed } from '@angular/core/testing';

import { PostModulesService } from './post-modules.service';

describe('PostModulesService', () => {
  let service: PostModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
