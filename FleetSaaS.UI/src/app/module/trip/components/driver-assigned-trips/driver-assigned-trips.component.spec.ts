import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverAssignedTripsComponent } from './driver-assigned-trips.component';

describe('DriverAssignedTripsComponent', () => {
  let component: DriverAssignedTripsComponent;
  let fixture: ComponentFixture<DriverAssignedTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverAssignedTripsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverAssignedTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
