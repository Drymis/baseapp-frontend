import { Component, OnInit, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-google-button',
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.scss']
})
export class GoogleButtonComponent implements OnInit {

  @Input() public text = 'Sign In with Google';

  constructor(
  ) {
  }


  ngOnInit() {
  }

}
