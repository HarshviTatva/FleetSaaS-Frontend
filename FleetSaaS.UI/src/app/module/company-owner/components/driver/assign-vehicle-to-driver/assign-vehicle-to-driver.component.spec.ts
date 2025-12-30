import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignVehicleToDriverComponent } from './assign-vehicle-to-driver.component';

describe('AssignVehicleToDriverComponent', () => {
  let component: AssignVehicleToDriverComponent;
  let fixture: ComponentFixture<AssignVehicleToDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignVehicleToDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignVehicleToDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
