
import {of as observableOf,  Observable } from 'rxjs';

import {map} from 'rxjs/operators';

import { SearchMusic } from './searchMusic.service';
//榜单相关的数据处理

import { Injectable } from '@angular/core';
import { AcreatrequestService } from './acreatrequest.service';

@Injectable()
export class BillboardService {

    allBoard: AllBoard[] = [];

    //某一榜单下面的歌曲列表组件需要 榜单列表组件指定榜单对于的更新时间
    getUpInfoBy(topidRef){
        
    }
    constructor(private acreatrequestSer: AcreatrequestService) { }
    //请求榜单数据
    topList(idx: any,count?:number) {
        let data = { "id" :idx, n: count || 1000 , csrf_token: ""};  
        return this.acreatrequestSer.creatRequest("post", "/weapi/v3/playlist/detail", data).pipe(map(res => this.resole(res["playlist"])));
    }

    //解析某个榜单下的数据，包含几个字段和一组歌曲信息的 数据
    resole(res) {
       
        let tempSearchMusic: SearchMusic[] = [];

        for (let item of res["tracks"]) {

            tempSearchMusic.push(new SearchMusic(
                item["name"],
                item["ar"][0]["name"],
                item["al"]["name"],
                item["id"],
                item["ar"][0]["id"],
                item["al"]["picUrl"]
            ))
        }

        return  new BillboardList(
            res["coverImgUrl"],
            res["name"],
            res["id"],
            res["playCount"],
            res["shareCount"],
            res["subscribedCount"],
            res["subscribed"],
            res["commentCount"],
            res["commentThreadId"],
            res["updateTime"],
            tempSearchMusic
        )

    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////获取所有榜单列表//////////////////////////////////////////////////////////////
    ///////////////////////////////////////////获取所有榜单列表//////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    top() {
        
        if (this.allBoard.length !== 0) {
            return observableOf(this.allBoard) ;
        }
        let d = { csrf_token: '' };
        return this.acreatrequestSer.creatRequest("post", "/weapi/toplist", d).pipe(map(res => this.resoleTop(res["list"])))
    }

    //解析榜单数据
    resoleTop(res) {
       
            for (let item of res) {
                this.allBoard.push(new AllBoard(
                    item["coverImgUrl"],
                    item["name"],
                    item["id"],
                    item["commentThreadId"],
                    item["updateFrequency"],
                ))
            }
            return this.allBoard;    

    }
}

//一份榜单包含几个字段和一组歌曲信息
export class BillboardList {
    constructor(
        public coverImgUrl: string,
        public boardTypename: string,
        public boardTypeId: string,
        public playCount: string,
        public shareCount: string,
        public subscribedCount: string,
        public subscribed: Boolean,
        public commentCount: string,
        public commentThreadId: string,
        public updateTime: string,
        public searchMusicS: SearchMusic[]
    ) { }
}

export class AllBoard {
    constructor(
        public coverImgUrl: string,
        public boardTypename: string,
        public boardTypeId: string,
        public commentThreadId: string,
        public update: string,
        
    ) { }

    timeFormat(timeRef: number) {

        let tempMin = Math.floor(timeRef / 60);
        let tempSec = Math.floor(timeRef % 60);

        let curMin = tempMin < 10 ? ('0' + tempMin) : tempMin;
        let curSec = tempSec < 10 ? ('0' + tempSec) : tempSec;
        return curMin + ':' + curSec;

    }
}


