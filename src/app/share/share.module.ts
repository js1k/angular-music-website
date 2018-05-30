import { TowanPipe } from './../allservices/towan.pipe';
import { NgModule } from '@angular/core';
import { CommonComponent } from './common/common.component';
import { CommonModule } from '@angular/common';



@NgModule({

  declarations: [TowanPipe,
    CommonComponent
],
  imports: [
    CommonModule,
  ],  
  exports:[TowanPipe,CommonComponent]
  
})
export class ShareModule { }
