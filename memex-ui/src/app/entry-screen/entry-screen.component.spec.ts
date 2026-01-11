import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryScreenComponent } from './entry-screen.component';

describe('EntryScreenComponent', () => {
  let component: EntryScreenComponent;
  let fixture: ComponentFixture<EntryScreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
