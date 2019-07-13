import { TestBed } from '@angular/core/testing';

import { GetLocationServiceService } from './get-location-service.service';

describe('GetLocationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetLocationServiceService = TestBed.get(GetLocationServiceService);
    expect(service).toBeTruthy();
  });
});
