import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchMusic } from '../../allservices/searchMusic.service';
import { PlayingService } from '../../allservices/playing.service';
import { CommonService } from '../../allservices/common.service';

@Component({
  selector: 'app-songinfo',
  templateUrl: './songinfo.component.html',
  styleUrls: ['./songinfo.component.css']
})
export class SonginfoComponent implements OnInit {

  safeStr1;
  safeStr2;
  isShow: boolean = false;
  searchMusic: SearchMusic;
  id:string;
  constructor(private routeInfo: ActivatedRoute, private playingSer: PlayingService,private commonSer:CommonService) { }

  ngOnInit() {

    this.routeInfo.paramMap.subscribe(param => {
      // console.log("param",param);
       
      this.id = param["params"]["songid"];
      this.commonSer.commonSubject.next(this.id);
      this.playingSer.lrc(this.id).subscribe(res => { this.safeStr1 = res["str1"]; this.safeStr2 = res["str2"] });
      this.playingSer.songDetail(this.id).subscribe(res => this.searchMusic = res)

    })
  }

  showing() {
    this.isShow = !this.isShow;
  }

  playing(songIdRef) {
    if (songIdRef) {
      // console.log("我要请求播放歌曲。ID是:",songIdRef);
      this.playingSer.setIdSubject.next({ "lists": songIdRef, play: true });
    }
  }

 

}
