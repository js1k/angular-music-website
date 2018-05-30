import { Injectable } from '@angular/core';
import { AcreatrequestService } from './acreatrequest.service';

@Injectable()
export class SingerlistService {
    userInfoList: usrInfor[] = [];
    constructor(private acreatrequestSer: AcreatrequestService) {
        this.userInfoList = [
            new usrInfor("/user/home?id=29879272", "http://p1.music.126.net/p9U80ex1B1ciPFa125xV5A==/5931865232210340.jpg?param=62y62", "张惠妹aMEI", "台湾歌手张惠妹", "29879272"),
            new usrInfor("/user/home?id=100167517", "http://p1.music.126.net/1EN_iqQWU_E3DafzEOh3cA==/3302932937408956.jpg?param=62y62", "Fine乐团", "独立音乐人", "100167517"),
            new usrInfor("/user/home?id=58426904", "http://p1.music.126.net/ZuktZvjcxpYBjcWC3gmbPg==/19027048718765608.jpg?param=62y62", "萬曉利", "民谣歌手、中国现代民谣的代表人物之一", "58426904"),
            new usrInfor("/user/home?id=93504818", "http://p1.music.126.net/v_zYgE9kmAwVGWV2c8hFxA==/7943971513291094.jpg?param=62y62", "音乐人赵雷", "民谣歌手", "93504818"),
            new usrInfor("/user/home?id=46998208", "http://p1.music.126.net/U-duMw2-FE0wNRsuwGktPw==/109951162895674268.jpg?param=62y62", "王三溥", "音乐人", "46998208")
        ]
    }

}

export class usrInfor {
    constructor(
        private aLinkUrl: string,
        private imgUrl: string,
        private singerTitle: string,
        private desc: string,
        private songId: string) { }
}