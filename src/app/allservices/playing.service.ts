
import {map} from 'rxjs/operators';
import { Observable ,  Subject } from 'rxjs';

import { Injectable, EventEmitter, Output } from '@angular/core';
import { AcreatrequestService } from './acreatrequest.service';
import { stringify } from 'querystring';
import { SearchMusic } from './searchMusic.service';

@Injectable()
export class PlayingService {
    // songId:string = "452986458";
    //由于存在第一次进入页面时候希望请求歌曲信息，但是不播放，其他页面的请求要求则需要自动播放，play自动控制播放模块是否自动播放
    //外界会传递一个包含一首或多首歌曲信息的对象
    @Output() setIdSubject: Subject< {"lists":string,"play":boolean} > = new Subject;
    @Output() pushArrayEvent :EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
    constructor(private acreatrequestSer: AcreatrequestService) { }

    //外部传递进来歌曲ID，通过HTTP获取歌曲播放的URL
    playing(idRef: string) {
        
        // if(!idRef)  return Observable.of(null);
        // console.log("服务内获取的数据ID是:",idRef)
        let d = { "ids": "[]", "br": 128000, "csrf_token": "" };

        d.ids = `[${idRef}]`;

        return this.acreatrequestSer.creatRequest("post", "/weapi/song/enhance/player/url", d).pipe(map(res => res["data"][0]["url"]));      
    }

    //获取歌曲的详情
    songDetail(idRef: string) {

        if(!idRef)  idRef = "452986458";

        let d = { c: JSON.stringify([{ id: idRef }]), ids: '[' + idRef + ']' }; 
        return this.acreatrequestSer.creatRequest("post", "/weapi/v3/song/detail", d).pipe(map(res => this.resovleJson(res["songs"][0])))
    }

    resovleJson(res) {
       
        return new SearchMusic(
            res["name"],                                     
            res["ar"][0]["name"],     
            res["al"]["name"],
            res["id"], 
            res["ar"][0]["id"], 
            res["al"]["picUrl"], 
            undefined,
            res["alia"][0],               
        )
    }

    lrc(idRef:string){

        if(!idRef)  idRef = "452986458";

        let lrcUrl = '/weapi/song/lyric?id=' + idRef + '&lv=-1&kv=-1&tv=-1';
        let d = {
        }

        return this.acreatrequestSer.creatRequest("post", lrcUrl, d).pipe(map(res => this.acreatrequestSer.resolvelrc(res["lrc"]["lyric"])))
    }

    getAllIds(searchRef:SearchMusic[]):Array<string>{
        let ids :Array<string> = [];
        for(let item of searchRef ){
            ids.push(item["songId"]);
        }
        return ids ;
    }

}


