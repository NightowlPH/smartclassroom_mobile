import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsStatusPage } from './rooms-status.page';

describe('RoomsStatusPage', () => {
  let component: RoomsStatusPage;
  let fixture: ComponentFixture<RoomsStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsStatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
