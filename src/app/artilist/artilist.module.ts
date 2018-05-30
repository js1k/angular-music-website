import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtilistComponent } from './artilist.component';
import { ArtilistRoutes } from './artilist.routing';

@NgModule({
  imports: [
    CommonModule,
    ArtilistRoutes
  ],
  declarations: [ArtilistComponent]
})
export class ArtilistModule { }
