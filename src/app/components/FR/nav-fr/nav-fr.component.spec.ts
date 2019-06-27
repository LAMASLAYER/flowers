import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFRComponent } from './nav-fr.component';

describe('NavFRComponent', () => {
  let component: NavFRComponent;
  let fixture: ComponentFixture<NavFRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavFRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavFRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
