import { SongdetailComponent } from './songdetail.component';
import { Routes, RouterModule } from '@angular/router';
import { SonginfoComponent } from './songinfo/songinfo.component';

const routes: Routes = [
  { path: "", component: SongdetailComponent ,
  children: [
    { path: "", redirectTo: "detail/452986458", pathMatch: "full" },
    { path: "detail/:songid", component: SonginfoComponent },
  ]},
];
export const SongdetailRoutes = RouterModule.forChild(routes);

