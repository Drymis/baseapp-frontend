import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({name: 'youtubeEmbed'})
@Injectable()
export class YoutubeEmbedPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: any): SafeResourceUrl {
    var video_id = value.split("v=")[1].split("&")[0];
    var videoUrl = "https://www.youtube.com/embed/" + video_id + "?autoplay=1&mute=1&controls=0";
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
}