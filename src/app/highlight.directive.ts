import { Directive, ElementRef, Renderer2, HostListener, Host } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onEnter(){
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'yellow')
  }

  @HostListener('mouseleave') onLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'background-color');
  }
}
