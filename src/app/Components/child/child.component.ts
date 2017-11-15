import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input() parentComponentVar: string;
  
  @Output() childVarEmitter = new EventEmitter();
  childVariable = 'Soy childVariable';  
    
  constructor() { }

  ngOnInit() {
    // Emite la variable como resultado de un evento
    this.childVarEmitter.emit(this.childVariable);    
  }

}
