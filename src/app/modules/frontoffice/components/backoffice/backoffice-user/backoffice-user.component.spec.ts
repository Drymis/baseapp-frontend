import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BackofficeUserComponent } from './backoffice-user.component';


describe('BackofficeUserComponent', () => {
  let component: BackofficeUserComponent;
  let fixture: ComponentFixture<BackofficeUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackofficeUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackofficeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
