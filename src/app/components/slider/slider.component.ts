import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $:any //esto habilita el uso de jQuery

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() anchura: number
  @Input('etiqueta') captions: boolean
  @Output() conseguirAutor = new EventEmitter

  public autor: any

  constructor() {
    this.autor = {
      nombre: "Emilio Rosa",
      website: "emiliort.com",
      youtube: "no disponible"
    }
   }

  ngOnInit() {
      $('.bxslider').bxSlider({
        mode: 'fade',
        captions: false,
        slideWidth: this.anchura
      });
  }

  lanzar(event) {
    this.conseguirAutor.emit(this.autor)
  }

}
