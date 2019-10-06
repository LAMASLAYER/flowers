import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeventsComponent } from './fevents.component';

describe('FeventsComponent', () => {
  let component: FeventsComponent;
  let fixture: ComponentFixture<FeventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
