import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfuneralsComponent } from './ffunerals.component';

describe('FfuneralsComponent', () => {
  let component: FfuneralsComponent;
  let fixture: ComponentFixture<FfuneralsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfuneralsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfuneralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
