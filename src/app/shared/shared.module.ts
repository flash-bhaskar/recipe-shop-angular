import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "../alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";

@NgModule({
  imports: [CommonModule],
  exports: [DropdownDirective, AlertComponent, CommonModule],
  declarations: [DropdownDirective, AlertComponent],
  providers: [],
})
export class SharedModule {}
