import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverLogoutPage } from './popover-logout.page';

describe('PopoverLogoutPage', () => {
  let component: PopoverLogoutPage;
  let fixture: ComponentFixture<PopoverLogoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverLogoutPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverLogoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
