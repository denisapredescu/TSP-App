import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrentElement } from 'src/app/models/CurrentElement';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-exact-algorithms',
  templateUrl: './exact-algorithms.component.html',
  styleUrls: ['./exact-algorithms.component.scss']
})

export class ExactAlgorithmsComponent {
  dynamicProgramming: string = "";
  branchAndBound: string = "";
  pseudocodeDP: string = "";
  pseudocodeBB: string = "";

  @Input() currentSubsection: CurrentElement = {
    "section": "exact-algorithms",
    "subsection": "",
    "activate": true
  };
  @Output() changeSection = new EventEmitter<CurrentElement>();

  constructor(private storage: StorageService) {
    this.dynamicProgramming = this.storage.getDynamicProgrammingName();
    this.branchAndBound = this.storage.getBranchAndBoundName();
  }

  ngOnInit(): void {
    this.scroll();
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

  goToATSP() {
    this.changeSection.emit({
      "section": "variations",
      "subsection": "asymmetric-tsp",
      "activate": true
    });
  }

  getSection(section: string) {
    if (section !== this.currentSubsection.subsection) {
      this.changeSection.emit({
        "section": "exact-algorithms",
        "subsection": section,
        "activate": false
      });
    }
  }
}
