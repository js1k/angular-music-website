
import { RecommonComponent } from '../one/recommon/recommon.component';

import { MymusicComponent } from '../one/mymusic/mymusic.component';
import { FriendComponent } from '../one/friend/friend.component';
import { ProductComponent } from '../one/product/product.component';
import { LoadComponent } from '../one/load/load.component';
import { MusicListComponent } from '../musicList/musicList.component';



import { Routes, RouterModule } from '@angular/router';
import { NavbarsupComponent } from '../one/navbarsup/navbarsup.component';
import { HomesComponent } from './homes.component';

const routes1: Routes = [

        {
                path: "", component: HomesComponent,
                children: [
                        { path: "", redirectTo: "find", pathMatch: "full" },
                        {
                                path: "find", component: NavbarsupComponent,
                                children:
                                        [
                                                { path: "", redirectTo: "recommon", pathMatch: "full" },
                                                { path: "recommon", component: RecommonComponent },
                                                { path: "board", loadChildren: "../board/board.module#BoardModule" },
                                                { path: "songlist", loadChildren: "../songlist/songlist.module#SonglistModule" },
                                                { path: "radiolist", loadChildren: "../radiolist/radiolist.module#RadiolistModule" },
                                                { path: "artilist", loadChildren: "../artilist/artilist.module#ArtilistModule" },
                                                { path: "albumlist", loadChildren: "../albumlist/albumlist.module#AlbumlistModule" },
                                                { path: "songinfo", loadChildren: "../songdetail/songdetail.module#SongdetailModule" },
                                        ]
                        },
                        { path: "mymusic", component: MymusicComponent },
                        { path: "friend", component: FriendComponent },
                        { path: "product", component: ProductComponent },
                        { path: "load", component: LoadComponent },
                        { path: "musiclist", loadChildren: "../musicList/musicList.module#MusicListModule" },
                       
                ]

        }
];

export const HomesRoutes = RouterModule.forChild(routes1);
