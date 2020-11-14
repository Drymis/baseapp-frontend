import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() public iconPath;
  @Input() public viewBox = '0 0 24 24';

  constructor() { }

  ngOnInit() {
  }

}
