import { TestBed, inject } from '@angular/core/testing';

import { EmployeeProviderService } from './employee-provider.service';

describe('EmployeeProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeProviderService]
    });
  });

  it('should be created', inject([EmployeeProviderService], (service: EmployeeProviderService) => {
    expect(service).toBeTruthy();
  }));
});
