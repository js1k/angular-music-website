import { ShareModule } from './../share/share.module';





import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomesRoutes } from './homes.routing';

import { UserinfoComponent } from './../one/userinfo/userinfo.component';
import { BillboardComponent } from './../one/billboard/billboard.component';
import { BillboardService } from './../allservices/billboard.service';
import { AsupBarComponent } from './../one/asupbar/asupbarcomponent';
import { SuggestComponent } from './../one/suggest/suggest.component';
import { TopMusicComponent } from './../one/topMusic/topMusic.component';
import { HomesComponent } from './homes.component';
import { NavBarComponent } from '../one/navBar/navBar.component';
import { NavbarsupComponent } from '../one/navbarsup/navbarsup.component';
import { RecommonComponent } from '../one/recommon/recommon.component';
import { MymusicComponent } from '../one/mymusic/mymusic.component';
import { FriendComponent } from '../one/friend/friend.component';
import { ProductComponent } from '../one/product/product.component';
import { LoadComponent } from '../one/load/load.component';
import { SingerlistComponent } from '../one/singerlist/singerlist.component';
import { LivelistComponent } from './../one/livelist/livelist.component';


import { SuggestService } from '../allservices/suggest.service';
import { SingerlistService } from '../allservices/singerlist.service';
import { LivelistService } from './../allservices/livelist.service';
import { AllplaylistService } from '../allservices/allplaylist.service';
import { CommonService } from '../allservices/common.service';


@NgModule({
 
  declarations: [
    HomesComponent,
    NavBarComponent,
    NavbarsupComponent,
    RecommonComponent,
    MymusicComponent,
    FriendComponent,
    ProductComponent,
    LoadComponent,
    TopMusicComponent,
    SuggestComponent,
    AsupBarComponent,
    BillboardComponent,
    UserinfoComponent,
    SingerlistComponent, 
    LivelistComponent
  ],
  imports: [
    NgZorroAntdModule,
    CommonModule,
    FormsModule,
    HomesRoutes,
    ShareModule,
   
],
  exports: [HomesComponent],
  providers:[SuggestService,BillboardService,SingerlistService,LivelistService,AllplaylistService,CommonService]
})
export class HomeModule { }

