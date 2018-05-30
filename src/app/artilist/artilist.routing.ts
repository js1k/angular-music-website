import { ArtilistComponent } from './artilist.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:"",component:ArtilistComponent },
];

export const ArtilistRoutes = RouterModule.forChild(routes);
