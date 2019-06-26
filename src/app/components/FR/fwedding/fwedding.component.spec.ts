import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FweddingComponent } from './fwedding.component';

describe('FweddingComponent', () => {
  let component: FweddingComponent;
  let fixture: ComponentFixture<FweddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FweddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FweddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
