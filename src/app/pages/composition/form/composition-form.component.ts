import { Component } from "@angular/core";

@Component({
  selector: 'app-composition',
  templateUrl: './composition-form.component.html',
  styleUrls: [],
})
export class CompositionFormComponent {
  action!: string;

  constructor() {}

  ngOnInit(): void {
    this.action = 'new';
  }
}
