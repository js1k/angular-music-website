import { BoardComponent } from './board.component';
import { Routes, RouterModule } from '@angular/router';
import { BoardplaylistComponent } from './boardplaylist/boardplaylist.component';

const routes: Routes = [
  {
    path: "", component: BoardComponent,
    children: [
      { path: "", redirectTo: "playlist/19723756", pathMatch: "full" },
      { path: "playlist/:boardTypeId", component: BoardplaylistComponent },
    ]
  }
];

export const BoardRoutes = RouterModule.forChild(routes);
