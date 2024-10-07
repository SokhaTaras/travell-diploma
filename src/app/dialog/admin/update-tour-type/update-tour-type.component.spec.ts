import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTourTypeComponent } from './update-tour-type.component';

describe('UpdateTourTypeComponent', () => {
  let component: UpdateTourTypeComponent;
  let fixture: ComponentFixture<UpdateTourTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTourTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTourTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
