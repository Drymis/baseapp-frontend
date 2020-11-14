import { Component, OnInit, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-facebook-button',
  templateUrl: './facebook-button.component.html',
  styleUrls: ['./facebook-button.component.scss']
})
export class FacebookButtonComponent implements OnInit {

  @Input() public text = 'Sign In with Facebook';

  constructor(
  ) {
  }


  ngOnInit() {
  }

}
