import { TestBed } from '@angular/core/testing';

import { FoodTypesService } from './food-types.service';

describe('FoodTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodTypesService = TestBed.get(FoodTypesService);
    expect(service).toBeTruthy();
  });
});
