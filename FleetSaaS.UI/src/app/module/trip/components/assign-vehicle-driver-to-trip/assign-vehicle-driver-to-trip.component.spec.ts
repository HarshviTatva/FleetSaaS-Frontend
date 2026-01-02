import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignVehicleDriverToTripComponent } from './assign-vehicle-driver-to-trip.component';

describe('AssignVehicleDriverToTripComponent', () => {
  let component: AssignVehicleDriverToTripComponent;
  let fixture: ComponentFixture<AssignVehicleDriverToTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignVehicleDriverToTripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignVehicleDriverToTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
