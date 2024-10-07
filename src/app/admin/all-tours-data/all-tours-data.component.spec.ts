import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllToursDataComponent } from './all-tours-data.component';

describe('AllToursDataComponent', () => {
  let component: AllToursDataComponent;
  let fixture: ComponentFixture<AllToursDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllToursDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllToursDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
