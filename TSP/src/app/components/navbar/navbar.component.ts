import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CurrentElement } from 'src/app/models/CurrentElement';
import { NavbarElement } from 'src/app/models/NavbarElement';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  sections: NavbarElement[] = [];

  @Input() currentElement: CurrentElement = {
    "section": "variations",
    "subsection": "",
    "activate": true
  } ;
  @Output() sectionSelected = new EventEmitter<CurrentElement>();

  constructor(
    private storage: StorageService
  ){}

  ngOnInit(): void {
    this.storage.getNavbar().subscribe(
      (response) => {
        this.sections = response;
        this.changeSelectionOnNavbar();
      }
    );
  }

  public buttonClick(sectionIndex: number) {
  
    if (this.sections[sectionIndex].subsectionTo === "") {
      this.sectionSelected.emit({
          "section": this.sections[sectionIndex].index,
          "subsection": "",
          "activate": true
        });
    } else {
      this.sectionSelected.emit({
        "section": this.sections[sectionIndex].subsectionTo,
        "subsection": this.sections[sectionIndex].index,
        "activate": true
      });
    }
  }

  ngOnChanges() {
    this.changeSelectionOnNavbar();
  }

  changeSelectionOnNavbar() {
    this.sections.forEach((section: NavbarElement) => {

      section.isActive = false;     // doar sectiunea sau subsectiunea selectata este activa
 
      if (section.subsectionTo !== "") {   
        section.isShown = false;
      
        if (section.subsectionTo !== "" && this.currentElement.section === section.subsectionTo) { // if is a subsection and is directed to the current section
          section.isShown = true;
        }
      }

      if (this.currentElement.subsection !== "") {
        if(this.currentElement.subsection === section.index) {
          section.isActive = true;
          section.isShown = true;
        } 
      } else {
        if(this.currentElement.section === section.index) {
          section.isActive = true;
        } 
      }
    });
  }
}
