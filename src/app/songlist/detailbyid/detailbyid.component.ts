
import { mergeMap } from 'rxjs/operators';


import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AllplaylistService, SongInfoAndLists } from '../../allservices/allplaylist.service';
import { PlayingService } from '../../allservices/playing.service';
import "rxjs/add/operator/mergeMap"
import { SearchMusic } from '../../allservices/searchMusic.service';
import { CommonService } from '../../allservices/common.service';
@Component({
  selector: 'app-detailbyid',
  templateUrl: './detailbyid.component.html',
  styleUrls: ['./detailbyid.component.css']
})
export class DetailbyidComponent implements OnInit {
  isShow: boolean = false;

  songInfoAndLists: SongInfoAndLists;
  constructor(private routeInfo: ActivatedRoute, private AllplaylistSer: AllplaylistService, private playingSer: PlayingService, private commonSer: CommonService) { }

  ngOnInit() {
    let id;
    // this.commonSer.commonSubject.next(this.id);
    this.routeInfo.paramMap.pipe(mergeMap(param => {

      let id = param["params"]["id"];
      this.commonSer.commonSubject.next(id);
      return this.AllplaylistSer.getSongsByCollectionId(id)
    }
    )) .subscribe(res => this.songInfoAndLists = res);

  }

  playingone(songInfoRef) {
    // console.log("songIdRef来自歌单::-->", songIdRef);
    if (songInfoRef) {
      this.playingSer.setIdSubject.next({ "lists": songInfoRef, play: true });
    }
  }

  pushIds() {
    //只推送数组内的ID字段。
    let a = this.playingSer.getAllIds(this.songInfoAndLists.searchMusic);
    // console.log("a:",a);
    this.playingSer.pushArrayEvent.emit(a);

    this.playingSer.setIdSubject.next({ "lists": a[0], play: true });
  }


  showing() {
    this.isShow = !this.isShow;
  }

}
