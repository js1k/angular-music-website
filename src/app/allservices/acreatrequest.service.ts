import { Injectable } from '@angular/core';
import { AesrsaService } from './aesrsa.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

// http://music.163.com/api/playlist/detail?id=387699584
// http://s.music.163.com/search/get/?s=%E5%91%8A%E7%99%BD%E6%B0%94%E7%90%83&limit=10&type=1
@Injectable()
export class AcreatrequestService {

    constructor(private aesRsaSer: AesrsaService, private httpC: HttpClient, private domSanitizer: DomSanitizer) { }

    //构建统一的HTTP请求接口
    creatRequest(method: string, url: string, data: Object) {
        //先加密数据
        let bodyTemp = this.aesRsaSer.encObject(data);
        //构造参数
        let httpPamram: HttpParams = new HttpParams().set("params", bodyTemp.encText).set("encSecKey", bodyTemp.encSecKey);


        let httpPamramTemp = httpPamram.toString().replace(/[+]/g, "%2B");
        //设置请求头
        let header: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        
        return this.httpC.request(
            method,
            url,
            {
                body: httpPamramTemp,
                "headers": header,
                withCredentials: true
            })
    }


    resolvelrc(resRef: string) {

        if (!resRef) return null;

        let lrc: Array<string> = resRef.split("\n");
        let str1 = "", str2 = "";
        let leng = lrc.length - 1;

        for (let i = 0; i < leng; i++) {
            if (i < 13) {
                str1 += lrc[i] + "<br />";
            }
            else {
                str2 += lrc[i] + "<br />"
            }
        }

        let regExp: RegExp = /\[.*?]/g;
        str1 = str1.replace(regExp, "");
        str2 = str2.replace(regExp, "");

        let str11 = this.domSanitizer.bypassSecurityTrustHtml(str1);
        let str22 = this.domSanitizer.bypassSecurityTrustHtml(str2);

        return { "str1": str11, "str2": str22 };
    }


    testApi() {


        // let id = 557584888;
        // let testUrl = '/weapi/v1/resource/comments/R_SO_4_557584888';
        // let testData = {
        //     offset: 0,
        //     rid: 557584888,
        //     limit: 20,
        //     csrf_token: ""
        //   };
        // console.log("测试API", testUrl);
        // return this.creatRequest("post", testUrl, testData)
    }
}




