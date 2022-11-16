import { TestBed } from '@angular/core/testing';

import { NavparamsService } from './navparams.service';

describe('NavparamsService', () => {
  let service: NavparamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavparamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
