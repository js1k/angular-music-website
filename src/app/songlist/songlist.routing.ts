import { Routes, RouterModule } from '@angular/router';
import { SonglistComponent } from './songlist.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { DetailbyidComponent } from './detailbyid/detailbyid.component';

const routes: Routes = [
  {
    path: "", component: SonglistComponent,
    children: [
      { path: "", redirectTo: "collection/全部", pathMatch: "full" },
     { path: "collection/:cattype", component: PlaylistComponent },
     { path: "detailby/:id", component: DetailbyidComponent },
]
  }
];

export const SonglistRoutes = RouterModule.forChild(routes);
