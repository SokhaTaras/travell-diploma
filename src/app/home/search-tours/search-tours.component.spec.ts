import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchToursComponent } from './search-tours.component';

describe('SearchToursComponent', () => {
  let component: SearchToursComponent;
  let fixture: ComponentFixture<SearchToursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchToursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
