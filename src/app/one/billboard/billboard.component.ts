
import { Component, OnInit, Input } from '@angular/core';
import { BillboardService, BillboardList } from '../../allservices/billboard.service';
import { PlayingService } from '../../allservices/playing.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-billboard',
  templateUrl: './billboard.component.html',
  styleUrls: ['./billboard.component.css']
})
export class BillboardComponent implements OnInit {

  //区分榜单类型，默认是新歌榜
  @Input() id: string = "";
  @Input() title: string = "";
  count: number = 10;

  billboardPlayList: BillboardList;
  constructor(private billboardSer: BillboardService, private playingSer: PlayingService) { }

  ngOnInit() {
    this.billboardSer.topList(this.id, this.count).subscribe(res => this.billboardPlayList = res);
  }

  paly(songIdRef) {
    //如果数据不为空,把歌曲ID推送出去
    // console.log("把歌曲ID推送出去,来自榜单的推送",songInfoRef);
    if (songIdRef) {
      // console.log("我要请求播放歌曲。ID是:",songInfoRef);
      this.playingSer.setIdSubject.next({ "lists": songIdRef, play: true });
    }
  }

  pushIds() {
    //只推送数组内的ID字段。
    //由于首页只请求了10首，全部播放的时候需要重新请求
    let b: Array<any> = [];
    this.billboardSer.topList(this.id).subscribe(res => {

      b = res["searchMusicS"]; let a = this.playingSer.getAllIds(b);
      this.playingSer.pushArrayEvent.emit(a);
      this.playingSer.setIdSubject.next({ "lists": a[0], play: true })

    });

    return false;
  }

}














