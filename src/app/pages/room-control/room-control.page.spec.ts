import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomControlPage } from './room-control.page';

describe('RoomControlPage', () => {
  let component: RoomControlPage;
  let fixture: ComponentFixture<RoomControlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomControlPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomControlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
