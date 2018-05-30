import { Injectable } from '@angular/core';
import { AcreatrequestService } from './acreatrequest.service';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable ,of as observableOf} from 'rxjs';

@Injectable()
export class CommonService {

    // 0: 'R_SO_4_',
    // 1: 'R_MV_5_', 
    // 2: 'A_PL_0_', 
    // 3: 'R_AL_3_', 
    // 4: 'A_DJ_1_' 

    commonSubject :BehaviorSubject<string> = new BehaviorSubject("");


    constructor(private acreatrequestSer: AcreatrequestService, private domSanitizer: DomSanitizer) { }

    getCommon(typeRef: string,idRef:string,offsetRef ?:number) {
       
        // let id = 812400;
        // let url = '/weapi/v1/resource/comments/R_SO_4_812400';
        if (!idRef) return observableOf(null);
        
        let url = `/weapi/v1/resource/comments/${typeRef}${idRef}`;

        let data = {
            offset: offsetRef || 0,
            rid: idRef,
            limit: 20,
            csrf_token: ""
        };

        return this.acreatrequestSer.creatRequest("post", url, data).pipe(map(res => this.resovel(res)))
    }

    resovel(res: any) {
        // console.log("resovelRes:",res)
        if (!res) return null;

        let commonColet: CommonColet = new CommonColet();

        commonColet.total = res["total"];
        if (res["hotComments"]) {
            // console.log("hotComments::",res["hotComments"])
            commonColet.spliceN = res["hotComments"].length || 0 ;

        }
       

        //获取热门评论
        let hotCommon: any = this.resovelCommon(res["hotComments"]);

        // //获取最新评论

        let newCommon: any = this.resovelCommon(res["comments"]);

        //获取某一个评课下面的评论
        // console.log("hotCommon.concat(newCommon);:",hotCommon.concat(newCommon))

        commonColet.common = hotCommon.concat(newCommon);
        
        // console.log("commonColet::",commonColet)
        return commonColet
    }



    getone(item) {

        let content,strSafe;

        if(item["content"]){

            content = item["content"].replace(/\n/g, "<br>");
            strSafe = this.domSanitizer.bypassSecurityTrustHtml(content);
        }
      
        return new Common(
            item["user"]["nickname"],
            item["user"]["avatarUrl"],
            strSafe,
            item["userId"],
            item["time"],
            item["likedCount"],
            item["commentId"])
    }


    resovelCommon(res: any) {

        // console.log("resovelCommon:", res)
        let commons: Common[][] = [];
        

        for (let items of res) {

            let common: Common[] = []

            //评论总是在第一维的第一个位置，每一条评论对应的回复从下标1开始
            common.push(this.getone(items));

            if (items["beReplied"]) {

                for (let item of items["beReplied"]) {

                    common.push(this.getone(item))


                    // console.log("item::",item)

                }

            }
            commons.push(common);

        }

        // console.log("commons::", commons)
        return commons;
    }

}



//common二维数组。每一维是一个Common集合，第一个是评论，后面的是该评论的回复

export class CommonColet {

    total: string;
    spliceN: number;
    common: Common[][];

}


export class Common {

    constructor(public nickname: string,
        public avatarUrl: string,
        public content: any,
        public userId: string,
        public time: string,
        public likedCount: string,
        public commentId?: string,

    ) { }
}