import { TestBed } from '@angular/core/testing';

import { ActualizacionAppService } from './actualizacion-app.service';

describe('ActualizacionAppService', () => {
  let service: ActualizacionAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualizacionAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
