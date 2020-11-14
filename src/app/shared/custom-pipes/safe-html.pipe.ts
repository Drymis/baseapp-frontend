import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({name: 'sanitizeHtml'})
@Injectable()
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}