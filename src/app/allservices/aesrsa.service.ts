import { Injectable } from '@angular/core'
import * as CryptoJS from "crypto-js"


declare let setMaxDigits: any;
declare let RSAKeyPair:any;
declare let encryptedString: any;

// console.log("md5jiami:::" ,CryptoJS.MD5("20962312@!") ) ;


@Injectable()

export class AesrsaService {
    e = "010001";		
    f = "00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7";
    g = "0CoJUm6Qyw8W8jud";
 
    constructor() { }


    a(a) {
        let d, e, b = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", c = "";
        for (d = 0; a > d; d += 1)
            e = Math.random() * b.length,
                e = Math.floor(e),
                c += b.charAt(e);
        return c
    }
    b(a, b) {
        let c = CryptoJS.enc.Utf8.parse(b)
            , d = CryptoJS.enc.Utf8.parse("0102030405060708")
            , e = CryptoJS.enc.Utf8.parse(a)
            , f = CryptoJS.AES.encrypt(e, c, {
                iv: d,
                mode: CryptoJS.mode.CBC
            });
        return f.toString()
    }
    c(a, b, c) {
        let d, e;
        return setMaxDigits(131),
            d = new RSAKeyPair(b, "", c),
            e = encryptedString(d, a)
    }
   
    d(d, e, f, g) {
        let h = {
            encText: "",
            encSecKey: ""
        },

            i = this.a(16);
        return h.encText = this.b(d, g),
            h.encText = this.b(h.encText, i),
            h.encSecKey = this.c(i, e, f),
            h
    }

    encObject (obj:any):any {
       
        let stObj = JSON.stringify(obj)
        return this.d(stObj,this.e,this.f,this.g); 
 
    }   

}