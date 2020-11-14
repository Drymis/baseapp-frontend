import { PortfolioUtility } from 'src/app/shared/utilities/portfolio-utility';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) {
  }

  uploadFileAndGetUrl(uploadedfile: File, filetype: string) {
    const body = {
      file: uploadedfile,
      type: filetype,
    };

    const formData = PortfolioUtility.objectToFormData(body);

    return this.http.post(environment.serverAPI + '/fileupload', formData).toPromise();
  }
}