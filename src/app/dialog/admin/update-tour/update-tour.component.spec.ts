import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTourComponent } from './update-tour.component';

describe('UpdateTourComponent', () => {
  let component: UpdateTourComponent;
  let fixture: ComponentFixture<UpdateTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
