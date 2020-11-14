import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconArrowForwardComponent } from './icon-arrow-forward.component';

describe('IconArrowForwardComponent', () => {
  let component: IconArrowForwardComponent;
  let fixture: ComponentFixture<IconArrowForwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconArrowForwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconArrowForwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
