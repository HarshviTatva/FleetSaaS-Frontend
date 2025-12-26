import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDispatcherComponent } from './add-edit-dispatcher.component';

describe('AddEditDispatcherComponent', () => {
  let component: AddEditDispatcherComponent;
  let fixture: ComponentFixture<AddEditDispatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDispatcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDispatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
