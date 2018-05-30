//负责musicList组件数据

import { Observer ,  BehaviorSubject } from 'rxjs';
import {map} from 'rxjs/operators';

import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


import { AesrsaService } from './aesrsa.service';

import { AcreatrequestService } from './acreatrequest.service';



// .debounceTime(1000).distinctUntilChanged()
@Injectable()
export class SearchMusicService {

    searchMusics: SearchMusic[] = [];
    songsCount: number = 0;

    searchEvent: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor(private acreatrequestSer: AcreatrequestService) { };

    search(st) {
     
        let d = { "s": "", "limit": "20", "csrf_token": "", "type": "1", "offset": "0" };
        this.searchMusics = [];
        d["s"] = st
        return this.acreatrequestSer.creatRequest("post", "/weapi/search/get", d).pipe(map(data => this.resole(data["result"])));

    }

    //解析搜索数据
    resole(res) {
        if (!res["songCount"]) return;
        this.songsCount = res["songCount"];

        for (let item of res["songs"]) {
           
            let duration = parseInt(item["duration"])/1000;
            let formDuration = this.timeFormat(duration);
          
            this.searchMusics.push(new SearchMusic(
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

        return this.searchMusics;
    }


    timeFormat(timeRef: number) {

        let tempMin = Math.floor(timeRef / 60);
        let tempSec = Math.floor(timeRef % 60);

        let curMin = tempMin < 10 ? ('0' + tempMin) : tempMin;
        let curSec = tempSec < 10 ? ('0' + tempSec) : tempSec;
        return curMin + ':' + curSec;

    }
}

export class SearchMusic {

    constructor(
        public song: string,
        public singer: string,
        public alName: string,
        public songId: string,
        public singerId: string,
        public pictureUl: string,
        public timeTotal?: string,
        public songsup?: string

    ) { }
}


