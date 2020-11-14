import {Directive, Input, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[ngInit]'
})
export class NgInitDirective {

  @Output('ngInit') initEvent: EventEmitter<any> = new EventEmitter();
  @Input('field') field;

  ngOnInit() {
    setTimeout(() => {
        this.field = "TEST";
        this.initEvent.emit();
        // this.initEvent.next();
    }, 10);
  }
}