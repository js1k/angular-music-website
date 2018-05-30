import { AlbumlistComponent } from './albumlist.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:"",component:AlbumlistComponent  },
];

export const AlbumlistRoutes = RouterModule.forChild(routes);
