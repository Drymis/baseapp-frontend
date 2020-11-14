import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaUploadPreviewComponent } from './media-upload-preview.component';

describe('MediaUploadPreviewComponent', () => {
  let component: MediaUploadPreviewComponent;
  let fixture: ComponentFixture<MediaUploadPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaUploadPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaUploadPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
