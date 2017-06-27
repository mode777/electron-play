import { NgModule } from "@angular/core";
import { MdIconModule, MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdListModule, MdInputModule, MdSlideToggleModule } from '@angular/material';

@NgModule({
  imports: [ MdIconModule, MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdListModule, MdInputModule, MdSlideToggleModule ],
  exports: [ MdIconModule, MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdListModule, MdInputModule, MdSlideToggleModule ],
})
export class MaterialModule { }