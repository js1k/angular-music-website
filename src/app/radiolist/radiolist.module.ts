import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadiolistComponent } from './radiolist.component';
import { RadiolistRoutes } from './radiolist.routing';

@NgModule({
  imports: [
    CommonModule,
    RadiolistRoutes
  ],
  declarations: [RadiolistComponent]
})
export class RadiolistModule { }
