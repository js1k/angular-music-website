
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchMusic, SearchMusicService } from '../allservices/searchMusic.service';
import { PlayingService } from '../allservices/playing.service';



@Component({
    selector: 'app-musicList',
    templateUrl: './musicList.component.html',
    styleUrls: ['./musicList.component.css']
})
export class MusicListComponent implements OnInit, OnDestroy {
    test: any;
    searchMusics: SearchMusic[] = [];

    constructor(private searchMusicSer: SearchMusicService ,private playingSer:PlayingService) { }

    ngOnInit() {
        // console.log("ngOnInit--->");     
        this.test = this.searchMusicSer.searchEvent.subscribe( (res) => {if(!res)return;this.searchMusicSer.search(res).subscribe((data) => { this.searchMusics = data })})
 
    }

    paly(songIdRef){
        //如果数据不为空,把歌曲ID推送出去
        // console.log("把歌曲ID推送出去",id);
        if(songIdRef){
            // console.log("我要请求播放歌曲。ID是:",songInfoRef);
            this.playingSer.setIdSubject.next({"lists":songIdRef,play:true});  
        }  
    }

    pushIds(){
        //只推送数组内的ID字段。
        let a  = this.playingSer.getAllIds(this.searchMusics);
        // console.log("a:",a);
        this.playingSer.pushArrayEvent.emit( a );
      
        this.playingSer.setIdSubject.next({"lists":a[0],play:true});
      }

      

    ngOnDestroy() {
        // console.log("我被销毁了");
        this.test.unsubscribe();
        
    }
}
