import { Routes, RouterModule } from '@angular/router';
import { NavbarsupComponent } from './one/navbarsup/navbarsup.component';

const routes: Routes = [
  {path: "", redirectTo:"homes",pathMatch:"full" },
  {path: "homes", loadChildren:"./homes/home.module#HomeModule" },
];

export const AppRoutes = RouterModule.forRoot(routes);

