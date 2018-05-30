import { RadiolistComponent } from './radiolist.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", component: RadiolistComponent, },
];

export const RadiolistRoutes = RouterModule.forChild(routes);
