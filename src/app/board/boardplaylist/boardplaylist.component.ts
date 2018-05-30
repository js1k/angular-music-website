
import { mergeMap } from 'rxjs/operators';

import { SearchMusic } from './../../allservices/searchMusic.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import "rxjs/add/operator/mergeMap"
import { BillboardList, BillboardService } from '../../allservices/billboard.service';
import { PlayingService } from '../../allservices/playing.service';
import { CommonService } from '../../allservices/common.service';

@Component({
  selector: 'app-boardplaylist',
  templateUrl: './boardplaylist.component.html',
  styleUrls: ['./boardplaylist.component.css']
})
export class BoardplaylistComponent implements OnInit {

  billboardList: BillboardList;
  id: string;

  constructor(private routeInfo: ActivatedRoute,
    private billboardSer: BillboardService,
    private playingSer: PlayingService,
    private commonSer: CommonService) { }

  ngOnInit() {

    this.routeInfo.paramMap.pipe(mergeMap(param => {

      this.id = param["params"]["boardTypeId"];
      this.commonSer.commonSubject.next(this.id);

      return this.billboardSer.topList(this.id)

    }))
      .subscribe(res => this.billboardList = res)

  }

  playingone(songIdRef) {
    // console.log("songIdRef::-->",songIdRef);
    if (songIdRef) {
      // console.log("我要请求播放歌曲。ID是:",songInfoRef);
      this.playingSer.setIdSubject.next({ "lists": songIdRef, play: true });
    }
  }

  pushIds() {
    //只推送数组内的ID字段。
    let a = this.playingSer.getAllIds(this.billboardList.searchMusicS);
    // console.log("a:",a);
    this.playingSer.pushArrayEvent.emit(a);

    this.playingSer.setIdSubject.next({ "lists": a[0], play: true });
  }
}
