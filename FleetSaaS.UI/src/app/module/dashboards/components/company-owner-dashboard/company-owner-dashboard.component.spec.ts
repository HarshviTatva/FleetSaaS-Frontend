import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOwnerDashboardComponent } from './company-owner-dashboard.component';

describe('CompanyOwnerDashboardComponent', () => {
  let component: CompanyOwnerDashboardComponent;
  let fixture: ComponentFixture<CompanyOwnerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyOwnerDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyOwnerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
