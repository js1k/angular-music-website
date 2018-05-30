
import {of as observableOf,  Observable } from 'rxjs';

import {map} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { AcreatrequestService } from './acreatrequest.service';
import { SearchMusic } from './searchMusic.service';

import { SafeHtml } from '@angular/platform-browser';

@Injectable()
export class AllplaylistService {

    allCattype: AllCattype[] = [];
    songCollection: SongCollection[] = [];
   
    constructor(private acreatrequestSer: AcreatrequestService) { }
    /////////////////获取所有歌单类别///////////////////////
    getAllCatType() {
        //由于歌单分类不可能变化的很快所以，只请求一次

        if (this.allCattype.length !== 0) {
            return observableOf(this.allCattype);
        }
        let urlcat = "/weapi/playlist/catalogue";
        let urldata = {
            csrf_token: ''
        };

        return this.acreatrequestSer.creatRequest("post", urlcat, urldata).pipe(map(res => this.resovelcatlist(res)))
    }


    getSongsByCollectionId(idRef: string ,count?:number) {
        // let id = 2149267461;
        let testUrl = "/weapi/playlist/detail";

        let testData = {
            "id": idRef,
            "n": count||100000,
            csrf_token: ""
        };
        // console.log("测试API", testUrl," testData", testData);
        //分2步解析第一步解析歌单列表的信息，第二部解析每个歌曲的信息（数组）
        return this.acreatrequestSer.creatRequest("post", testUrl, testData).pipe(map(res =>this.resovelSonglist(res)))
    }


    getSongCollectionList(catTypeRef?: string,limitRef?:number, offsetRef?: number, hotornotRef?: string) {
        //先情空数据
        this.songCollection = [];

        let songCollectionUrl = '/weapi/playlist/list';
        let data = {
            cat: catTypeRef || '全部',
            order: hotornotRef || 'hot',
            offset: offsetRef || 0,
            total: 'true',
            limit: limitRef ||35
        }
        //  console.log("data:", data);
        return this.acreatrequestSer.creatRequest("post", songCollectionUrl, data).pipe(map(res => this.resovelSongCollection(res["playlists"])));
    }

    resovelcatlist(res) {
        // console.log("catlist-->res", res);
        let list = res["categories"];

        for (let item in list) {
            let typex = list[item];
            this.allCattype.push(new AllCattype(typex));
        }

        for (let item of res["sub"]) {

            let index1 = item["category"];

            this.allCattype[index1].oneCats.push(new OneCat(item["name"],
                item["resourceCount"],
                item["imgUrl"],
                item["category"],
                item["hot"])
            )
        }

        return this.allCattype;
    }

    resovelSongCollection(res) {
        for (let item of res) {

            this.songCollection.push(this.creat(item))
        }

        return this.songCollection;
    }



    //解析歌单
    resovelSonglist(res) {
        let searchMusicTemp = [];
        let songCollectionTemp = this.creat(res["result"]);


        for (let item of res["result"]["tracks"]) {

            let duration = parseInt(item["duration"]) / 1000;
            let formDuration = this.timeFormat(duration);

            searchMusicTemp.push(new SearchMusic(
                item["name"],
                item["artists"][0]["name"],
                item["album"]["name"],
                item["id"],
                item["artists"][0]["id"],
                item["artists"][0]["img1v1Url"],
                formDuration,
                item["alias"][0],
            ))
        }
        // console.log("songCollectionTemp",songCollectionTemp,"-------searchMusicTemp",searchMusicTemp,)
        return new SongInfoAndLists(songCollectionTemp, searchMusicTemp);

    }

    creat(res){
        // console.log("resxxxxx",res)

         let innerHtml1 =  this.acreatrequestSer.resolvelrc(res["description"]);
        //  console.log("歌单里面获取的数据innerHtml:",innerHtml);
        return new SongCollection(
            res["name"],
            res["id"],
            res["subscribedCount"],
            res["trackCount"],
            res["coverImgUrl"],
            innerHtml1,
            res["playCount"],
            res["shareCount"],
            res["commentCount"],
            res["createTime"],
            [ res["tags"][0], res["tags"][1], res["tags"][2] ] , 
            res["creator"]["userId"],
            res["creator"]["province"],
            res["creator"]["avatarUrl"],
            res["creator"]["city"],
            res["creator"]["birthday"],
            res["creator"]["nickname"],
            res["creator"]["signature"]
        )
    }

    timeFormat(timeRef: number) {

        let tempMin = Math.floor(timeRef / 60);
        let tempSec = Math.floor(timeRef % 60);

        let curMin = tempMin < 10 ? ('0' + tempMin) : tempMin;
        let curSec = tempSec < 10 ? ('0' + tempSec) : tempSec;
        return curMin + ':' + curSec;

    }

}


//歌单按照标签分类 如流行 摇滚等/////////////////////////////
export class AllCattype {
    constructor(private cattype: string) { }
    oneCats: OneCat[] = [];
}


export class OneCat {
    constructor(public name: string,
        public resourceCount: string,
        public imgUrl: string,
        public category: number,
        public hot: string,
    ) { }

}

/////////////////每一个歌单的信息，歌单是一些歌曲的集合//////
export class SongCollection {
    constructor(
        public name: string,
        public id: string,

        public subscribedCount: string,
        public trackCount: string,
        public coverImgUrl: string,
        public description: {"str1":SafeHtml,"str2":SafeHtml},

        public playCount: number,
        public shareCount: number,
        public commentCount: number,
        public updateTime: number,
        public tags: Array<string>,
        public userId: string,
        public province: string,
        public avatarUrl: string,
        public city: string,
        public birthday: string,
        public nickname: string,
        public signature: string) { }

}

export class SongInfoAndLists {
    constructor(public songCollection: SongCollection,public searchMusic: SearchMusic[]) { }
}



