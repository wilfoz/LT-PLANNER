import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'default-root',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent {
  @HostBinding('class.mat-typography') class = true;
  title = 'lt-angular';
  sideBarOpen = true;

  constructor() { }

  ngOnInit() { }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
