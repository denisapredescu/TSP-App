import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrentElement } from 'src/app/models/CurrentElement';
import { StorageService } from 'src/app/services/storage.service';
import { NgImageSliderComponent } from 'ng-image-slider';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-approximation-algorithms',
  templateUrl: './approximation-algorithms.component.html',
  styleUrls: ['./approximation-algorithms.component.scss']
})

export class ApproximationAlgorithmsComponent {
  
  @Input() currentSubsection: CurrentElement = {
    "section": "approximation-algorithms",
    "subsection": "",
    "activate": false
  };
  @Output() changeSection = new EventEmitter<CurrentElement>();
  
  christofidesAlgorithm: string = "";
  doubleTreeAlgorithm: string = "";
  dfs_images: any[] = [];

  constructor(
    private storage: StorageService,
    private router: Router
  ) {
    this.christofidesAlgorithm = this.storage.getChristofidesAlgorithmName();
    this.doubleTreeAlgorithm = this.storage.getDoubleTreeAlgorithmName();
    this.storage.getApproximationAlg().subscribe(
      (response) => {
        this.dfs_images = response["dfs_images"];
      }
    )
  }
  
  ngOnInit() {
  }

  ngOnChanges() {
    this.scroll();
  }

  scroll(): void {
    try {
      if (this.currentSubsection.activate) {
        var nameId;
        if(this.currentSubsection.subsection === "") {
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
        "section": "approximation-algorithms",
        "subsection": section,
        "activate": false
      });
    }
  }

  closeSidenav(){
    var sidenav = document.getElementById("sidenav") ?? new HTMLElement;
    sidenav.style.zIndex="-1";
  }

  goToNewTab(){
    const link = "https://sci-hub.ru/10.1007/978-3-540-71844-4";
    window.open(link, '_blank'); 
  }
}
