//推荐列表相关的数据处理

import { AesrsaService } from './aesrsa.service';

import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';



import { AcreatrequestService } from './acreatrequest.service';
@Injectable()
export class SuggestService {


d = {csrf_token: '872c3ff22647684a671ccd75982531f9'};
constructor( private acreatrequestSer:AcreatrequestService  ) {}

 suggest(){
    // return this.acreatrequestSer.creatRequest("post","/weapi/discovery/recommend/resource",this.d);
}
   
}