import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrentElement } from 'src/app/models/CurrentElement';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-heuristic-algorithms',
  templateUrl: './heuristic-algorithms.component.html',
  styleUrls: ['./heuristic-algorithms.component.scss']
})
export class HeuristicAlgorithmsComponent {

  @Input() currentSubsection: CurrentElement = {
    "section": "heuristic-algorithms",
    "subsection": "",
    "activate": false
  };
  @Output() changeSection = new EventEmitter<CurrentElement>();

  farthestInsertion: string = "";
  nearestInsertion: string = "";
  cheapestInsertion: string = "";
  nearestNeighbor: string = "";
  twoOpt: string = "";
  threeOpt: string = "";

  constructor(
    private storage: StorageService
  ) {
    this.farthestInsertion = this.storage.getFarthestInsertionName();
    this.nearestInsertion = this.storage.getNearestInsertionName();
    this.cheapestInsertion = this.storage.getCheapestInsertionName();
    this.nearestNeighbor = this.storage.getNearestNeighborName();
    this.twoOpt = this.storage.getTwoOptName();
    this.threeOpt = this.storage.getThreeOptName();
  }

  ngOnChanges(): void {
    this.scroll();
  }

  scroll(): void {
    try {
      if (this.currentSubsection.activate) {
        var nameId;
        if(this.currentSubsection.subsection === '') {
          nameId = "up";
        } else {
          nameId = this.currentSubsection.subsection + '';
        }
        (document.getElementById(nameId) as HTMLElement).scrollIntoView(); 
      }
    }
    catch {}
  }

  getSection(section: string) {
    if (section !== this.currentSubsection.subsection) {
      this.changeSection.emit({
        "section": "heuristic-algorithms",
        "subsection": section,
        "activate": false
      });
    }
  }
}
