import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchQueryScreenComponent } from './search-query-screen.component';

describe('RetrievalScreenComponent', () => {
  let component: SearchQueryScreenComponent;
  let fixture: ComponentFixture<SearchQueryScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchQueryScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchQueryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
