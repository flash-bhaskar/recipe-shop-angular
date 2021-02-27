import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  constructor(private eleRef:ElementRef){}

  @HostListener('document:click',['$event']) toggleOpen(event:Event) {
    this.isOpen = this.eleRef.nativeElement.contains(event.target)? !this.isOpen:false;
  }
}
