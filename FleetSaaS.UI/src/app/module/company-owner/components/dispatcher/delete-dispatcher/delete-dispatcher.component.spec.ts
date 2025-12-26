import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDispatcherComponent } from './delete-dispatcher.component';

describe('DeleteDispatcherComponent', () => {
  let component: DeleteDispatcherComponent;
  let fixture: ComponentFixture<DeleteDispatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDispatcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDispatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
