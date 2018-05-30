import { Injectable } from '@angular/core';
import { AcreatrequestService } from './acreatrequest.service';
import { usrInfor } from './singerlist.service';

@Injectable()
export class LivelistService {

    liveList: usrInfor[] = [];
    constructor(private acreatrequestSer: AcreatrequestService) {
        this.liveList = [
            new usrInfor("/user/home?id=324314596", "http://p1.music.126.net/6cc6lgOfQTo6ovNnTHPyJg==/3427177769086282.jpg?param=40y40", "国家大剧院古典音乐频道", "国家大剧院古典音乐官方", "324314596"),
            new usrInfor("/user/home?id=2313954", "http://p1.music.126.net/slpd09Tf5Ju82Mv-h8MP4w==/3440371884651965.jpg?param=40y40", "DJ晓苏", "独立DJ，CRI环球旅游广播特邀DJ", "2313954"),
            new usrInfor("/user/home?id=278438485", "http://p1.music.126.net/H3QxWdf0eUiwmhJvA4vrMQ==/1407374893913311.jpg?param=40y40", "陈立", "心理学家、美食家陈立教授", "278438485"),
            new usrInfor("/user/home?id=91239965", "http://p1.music.126.net/y5-sM7tjnxnu_V9LWKgZlw==/7942872001461517.jpg?param=40y40", "DJ艳秋", "著名音乐节目主持人", "91239965"),
            new usrInfor("/user/home?id=1611157", "http://p1.music.126.net/xa1Uxrrn4J0pm_PJwkGYvw==/3130309604335651.jpg?param=40y40", "谢谢收听", "南京电台主持人王馨", "1611157")
        ]
    }

}