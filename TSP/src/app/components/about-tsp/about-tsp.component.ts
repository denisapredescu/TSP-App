import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrentElement } from 'src/app/models/CurrentElement';

@Component({
  selector: 'app-about-tsp',
  templateUrl: './about-tsp.component.html',
  styleUrls: ['./about-tsp.component.scss']
})
export class AboutTspComponent {
  @Input() currentSubsection: CurrentElement = {
    "section": "general",
    "subsection": "",
    "activate": true
  };
  @Output() changeSection = new EventEmitter<CurrentElement>();

  goToVariations() {
    this.changeSection.emit({
      "section": "variations",
      "subsection": "",
      "activate": true
    });
  }

}
