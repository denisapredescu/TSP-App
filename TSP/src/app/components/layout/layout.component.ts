import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CurrentElement } from 'src/app/models/CurrentElement';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  title = 'TSP';
  sidenavState: string = "visible";
  storedSection = localStorage.getItem('section');
  storedSubsection = localStorage.getItem('subsection')
  section: CurrentElement = {
    "section": this.storedSection == null || undefined ? "general" : this.storedSection,
    "subsection": this.storedSubsection == null || undefined ? "" : this.storedSubsection,
    "activate": true
  };

  currentLanguage: string;
  selectedLang = localStorage.getItem('language');

  constructor(private translate: TranslateService) {
    if (this.selectedLang == null || undefined) {
        localStorage.setItem('language', "ro");
        this.selectedLang = localStorage.getItem('language');
    }
    this.currentLanguage = translate.currentLang;
    localStorage.removeItem('section');
    localStorage.removeItem('subsection');
  }

  ngOnInit(): void { 
    if(this.currentLanguage != this.selectedLang)
    {
      console.log(this.selectedLang)
      this.currentLanguage = this.selectedLang!;
      this.translate.use(this.currentLanguage);
      localStorage.setItem('language', this.currentLanguage);
    }
  }

  ngAfterViewInit(){
    this.selectedLang = localStorage.getItem('language');
  }
  
  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
    localStorage.setItem('section', this.section.section);
    localStorage.setItem('subsection', this.section.subsection);
    window.location.reload();
  }

  doStuff() {
    if(this.sidenavState == "visible")
     this.sidenavState = "hidden";
    else
      this.sidenavState = "visible";
  }

  public changeSection(section: CurrentElement) {
    this.section = section;    
  }

  public fromSection(listSections: Array<string>): boolean {
    if (listSections.includes(this.section.section))
      return true;
    
    return false;
  }
}