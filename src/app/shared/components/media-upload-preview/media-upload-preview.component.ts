import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploadService } from 'src/app/core/services/fileupload.service';
import { environment } from 'src/environments/environment';
import { PortfolioUtility } from '../../utilities/portfolio-utility';

@Component({
  selector: 'app-media-upload-preview',
  templateUrl: './media-upload-preview.component.html',
  styleUrls: ['./media-upload-preview.component.scss']
})
export class MediaUploadPreviewComponent implements OnInit {

  @Input() public uploadedFileUrl;
  @Input() public mediaType;
  @Input() public text;
  @Output() public uploadedFileUrlChange = new EventEmitter<string>();
  public serverFileUrl = environment.serverFileUrl;

  constructor(
    private fileUploadService: FileUploadService,
  ) {
  }

  ngOnInit() {
    this.text = this.text.toUpperCase();
  }

  updateFileUrl(event) {
    const file = event.target.files[0];
    if (file) {
      const filetype = PortfolioUtility.getFileType(file);
      this.fileUploadService.uploadFileAndGetUrl(file, filetype).then((fileUrl: string) => {
        this.uploadedFileUrl = fileUrl;
        this.uploadedFileUrlChange.emit(this.uploadedFileUrl);
      });
    }
  }

}
