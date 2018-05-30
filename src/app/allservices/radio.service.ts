
//榜单相关的数据处理

import { Injectable } from '@angular/core';
import { AcreatrequestService } from './acreatrequest.service';

@Injectable()
export class RadioService {
    constructor(private acreatrequestSer: AcreatrequestService) { }
    //请求 主播电台 推荐数据
    newradio() {   
        let data = { "cateid": "0", "limit": "10","offset": "0", "csrf_token": "" };
        // return this.acreatrequestSer.creatRequest("post", '', data);
    }
 
}





