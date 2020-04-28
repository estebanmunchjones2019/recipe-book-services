import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  constructor(public vsRef: ViewContainerRef, ) { } //vsRef is a pointer to the place this directive was used, and alsa has method to create the component we want

}
