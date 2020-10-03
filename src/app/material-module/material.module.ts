import {NgModule} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
  ],
  exports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
  ]
})

export class MaterialModule { }
