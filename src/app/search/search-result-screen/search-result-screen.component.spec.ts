import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultScreenComponent } from './search-result-screen.component';

describe('SearchResultScreenComponent', () => {
  let component: SearchResultScreenComponent;
  let fixture: ComponentFixture<SearchResultScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
