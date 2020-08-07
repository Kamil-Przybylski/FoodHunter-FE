import { TestBed } from '@angular/core/testing';

import { FoodTagsService } from './food-tags.service';

describe('FoodTagsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodTagsService = TestBed.get(FoodTagsService);
    expect(service).toBeTruthy();
  });
});
