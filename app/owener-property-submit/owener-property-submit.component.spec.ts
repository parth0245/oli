import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwenerPropertySubmitComponent } from './owener-property-submit.component';

describe('OwenerPropertySubmitComponent', () => {
  let component: OwenerPropertySubmitComponent;
  let fixture: ComponentFixture<OwenerPropertySubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwenerPropertySubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwenerPropertySubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
