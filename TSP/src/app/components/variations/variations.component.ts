import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CurrentElement } from 'src/app/models/CurrentElement';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-variations',
  templateUrl: './variations.component.html',
  styleUrls: ['./variations.component.scss']
})

export class VariationsComponent {
  @Input() currentSubsection: CurrentElement = {
    "section": 'variations',
    "subsection": "", 
    "activate": false
  };
  @Output() changeSection = new EventEmitter<CurrentElement>();
  
  constructor(
    private storage: StorageService,
    private translate: TranslateService
  ) {}
  
  multipleVisits: any = [];
  metric: any = [];
  max: any = [];
  aTSP: any = [];

  displayedColumns: string[] = ['position', 'first', 'second'];
  matrix_aTPS_to_sTSP = [
    {position: 0, first:"U", second:"transpusa lui D'"},
    {position: 1, first:"D'", second:"U"},
 
  ];

  columns_aTSP: string[] = ['position', '0', '1', '2', '3'];

  matrix_aTSP = [
    [ "∞",  1,  4,  3],
    [1,  "∞", 1, 2],
    [2,  6, "∞",  5],
    [1, 5, 4, "∞"]
  ];

  
  ngOnInit() {
    this.storage.getVariations().subscribe(
      (response) => {
        this.metric = response["metric"];
        this.aTSP = response["asimetric"];
        this.multipleVisits = response["vizitari_multiple"];
        this.max = response["max"];

        this.aTSP.forEach((element: any, index: number) => {
          this.translate.get('variations.asymmetric.slider.' + index).subscribe(
            (text: string) => {
              console.log(text);
              element["title"] = text;
            })
        });

        this.multipleVisits.forEach((element: any, index: number) => {
          this.translate.get('variations.multipleVisits.slider.' + index).subscribe(
            (text: string) => {
              console.log(text);
              element["title"] = text;
            })
        });

        this.max.forEach((element: any, index: number) => {
          this.translate.get('variations.max.slider.' + index).subscribe(
            (text: string) => {
              console.log(text);
              element["title"] = text;
            })
        });
      }
    );
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

  goToChristofides() {
    this.changeSection.emit({
      "section": "approximation-algorithms",
      "subsection": 'chistofides-algorithm',
      "activate": true
    });
  }

  closeSidenav(){
    var sidenav = document.getElementById("sidenav") ?? new HTMLElement;
    sidenav.style.zIndex="-1";
  }

  getSection(section: string) {
    if (section !== this.currentSubsection.subsection) {
      this.changeSection.emit({
        "section": "variations",
        "subsection": section,
        "activate": false
      });
    }
  }

}
