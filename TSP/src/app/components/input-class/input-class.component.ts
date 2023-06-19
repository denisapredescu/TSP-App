import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrentElement } from 'src/app/models/CurrentElement';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-input-class',
  templateUrl: './input-class.component.html',
  styleUrls: ['./input-class.component.scss']
})
export class InputClassComponent {

  @Input() currentSubsection: CurrentElement = {
    "section": "input-class",
    "subsection": "",
    "activate": false
  };
  @Output() changeSection = new EventEmitter<CurrentElement>();

  inputClass: string = "";

  constructor(
    private storage: StorageService
  ) {
    this.inputClass = this.storage.getInputClassName();
  }

  ngOnInit() {
  }
}
