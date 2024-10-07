import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTourTypeComponent } from './add-tour-type.component';

describe('AddTourTypeComponent', () => {
  let component: AddTourTypeComponent;
  let fixture: ComponentFixture<AddTourTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTourTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTourTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
