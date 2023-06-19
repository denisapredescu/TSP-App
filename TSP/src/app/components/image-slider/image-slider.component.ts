import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent {
  @Input() images: any = {};
  @Input() popup: boolean = true;
  @Input() isVerticle: boolean = false;
  constructor() {}

  ngOnInit() {
    console.log(this.images);
  }

  closeSidenav(){
    var sidenav = document.getElementById("sidenav") ?? new HTMLElement;
    sidenav.style.zIndex="-1";
  }
}
