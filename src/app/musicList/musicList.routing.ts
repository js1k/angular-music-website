
import { Routes, RouterModule } from '@angular/router';
import { MusicListComponent } from './musicList.component';

const routes: Routes = [
  {path: "", component: MusicListComponent}
];

export const MusicListRoutes = RouterModule.forChild(routes);
