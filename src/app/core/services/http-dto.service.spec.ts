import { TestBed } from '@angular/core/testing';

import { HttpDtoService } from './http-dto.service';

describe('HttpDtoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpDtoService = TestBed.get(HttpDtoService);
    expect(service).toBeTruthy();
  });
});
