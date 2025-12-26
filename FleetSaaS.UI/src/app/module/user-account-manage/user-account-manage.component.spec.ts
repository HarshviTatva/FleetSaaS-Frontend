import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountManageComponent } from './user-account-manage.component';

describe('UserAccountManageComponent', () => {
  let component: UserAccountManageComponent;
  let fixture: ComponentFixture<UserAccountManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAccountManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAccountManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
