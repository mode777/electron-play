import { NgModule } from "@angular/core";
import { MdIconModule, MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdListModule, MdInputModule } from '@angular/material';

@NgModule({
  imports: [ MdIconModule, MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdListModule, MdInputModule ],
  exports: [ MdIconModule, MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdListModule, MdInputModule ],
})
export class MaterialModule { }