import { TestBed } from '@angular/core/testing';

import { GetweatherAndLocationService } from './getweather-and-location.service';

describe('GetweatherAndLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetweatherAndLocationService = TestBed.get(GetweatherAndLocationService);
    expect(service).toBeTruthy();
  });
});
