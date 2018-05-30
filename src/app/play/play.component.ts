
import {of as observableOf,  Observable } from 'rxjs';

import {switchMap} from 'rxjs/operators';
import { SearchMusic } from './../allservices/searchMusic.service';
import { PlayingService } from './../allservices/playing.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener } from '@angular/core';

import "rxjs/add/operator/mergeMap"


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})


export class PlayComponent implements OnInit {

  @ViewChild("myaudio") myaudio: ElementRef;
  //播放歌曲在列表的位置。默认是第一个;
  musicInfo: SearchMusic;
  songUrl: string = "";
  searchMusic: string[] = [];
  currentIndex: number = 0;

  isCanPlaying: boolean = false;

  isdrag: boolean = false;
  //假如为进度条最大值是1假如是音乐文件，最大值需要计算注意不同情况单位不同
  //两个进度条总长度
  totalProWidth: number = 493;
  //这个是垂直放置的
  totalProVolHeight: number = 74;

  //两个进度条对应的值
  srcTotalV: number = 1;
  srcTotalM: number;

  //传递给进度条的值，经过比例变化的
  scalVProLine: number;
  scalMProLine: number = 0;

  //传递给进度条的原始值，没有经过比例变化的
  proVolume: number = 0.5;
  proCurrrTime: number = 0;

  //两个进度条的拉伸系数
  scalV: number = 0;
  scalM: number = 0;

  innerText1: string = "00:00";
  innerText2: string = "00:00";

  //当前播放进度
  constructor(private playingSer: PlayingService) { }
  ngOnInit() {


    // console.log("ngOnInit")
    this.myaudio.nativeElement.pause();
    // this.checkIspalying();  
    //两个比例系数，声音的和播放音乐进度的

    this.scalV = this.totalProVolHeight / this.srcTotalV
    ////由于音乐文件的总长度需要等到资源加载才能获取 所以换地方初始化拉伸系数:scalM

    this.scalVProLine = this.proVolume * this.scalV;

    //////////////////////////////请求歌曲播放地址////////////////////////////////////
    //////////////////////////////请求歌曲播放地址////////////////////////////////////
    //////////////////////////////请求歌曲播放地址////////////////////////////////////
    this.playingSer.setIdSubject.pipe(switchMap(res => {
      //  console.log("res->:",res)
      let resT = res["lists"]
      this.isCanPlaying = res["play"] || false;
      //去重
      // console.log("resT->:",resT)
      if (resT && this.searchMusic.indexOf(resT) === -1) {
        this.searchMusic.push(resT);
      }
      //有可能第一次的时候数组里面什么都没有的，且没有数据推送过来
      if (this.searchMusic.length === 0) return observableOf(null);

      this.currentIndex = this.searchMusic.indexOf(resT);

      return this.playingSer.playing(this.searchMusic[this.currentIndex])
    })).subscribe(res => this.songUrl = res);

    //请求歌曲详情/////////////////////////////////////////////////////////////////////////////
    this.playingSer.setIdSubject.pipe(switchMap(res => this.playingSer.songDetail(res["lists"]))).subscribe(res => this.musicInfo = res);
    this.playingSer.pushArrayEvent.subscribe(res => { this.searchMusic = []; this.searchMusic = res })

  }

  endedChange() {
    // console.log("endedChange")
    this.currentIndex = this.canRockPlay(this.currentIndex, "+")
    this.playingSer.setIdSubject.next({ "lists": this.searchMusic[this.currentIndex], play: true });
  }

  myDurationchange(e) {
    // console.log("endedChange")
    // console.log("myDurationchange")
    // console.log("songUrl:", this.songUrl)
    this.proCurrrTime = 0;
    this.myaudio.nativeElement.currentTime = 0;
    this.innerText2 = this.timeFormat(0);

    this.srcTotalM = this.myaudio.nativeElement.duration;
    this.scalM = this.totalProWidth / this.srcTotalM
    this.innerText2 = this.timeFormat(this.srcTotalM);

  }

  canplay1(e) {
    // console.log("canplay1");

    if (!this.isCanPlaying) {
      this.myaudio.nativeElement.pause();
    }

    this.proCurrrTime = this.myaudio.nativeElement.currentTime;
    this.scalMProLine = this.proCurrrTime * this.scalM;
  }

  isdragFunc(e) {

    this.isdrag = e;

  }
  timeupdate1(e) {
    // console.log("3")
    //拖拽状态下阻止timeupdate1事件触发。。不然2者都会修改myaudio.nativeElement.currentTime
    if (this.isdrag) return;
    // console.log("播放时间刷新事件");
    this.proCurrrTime = this.myaudio.nativeElement.currentTime;
    this.scalMProLine = this.proCurrrTime * this.scalM;
    this.innerText1 = this.timeFormat(this.proCurrrTime);

  }

  proMusicChange(e) {
    if (this.isCanPlaying) {
      this.myaudio.nativeElement.currentTime = e / this.scalM;
    }
  }

  proVolumeChange(e) {

    this.proVolume = (this.totalProVolHeight - e) / this.scalV;
  }

  playOrPause() {

    let flag = this.myaudio.nativeElement.paused
    if (flag) {
      this.isCanPlaying = true;
      this.myaudio.nativeElement.play();
    }
    else {
      this.isCanPlaying = false;
      this.myaudio.nativeElement.pause();
    }
    return false;
  }

  play(sorx: string) {

    this.currentIndex = this.canRockPlay(this.currentIndex, sorx);
    this.playingSer.setIdSubject.next({ "lists": this.searchMusic[this.currentIndex], play: true });
    return false;

  }

  timeFormat(timeRef: number) {

    let tempMin = Math.floor(timeRef / 60);
    let tempSec = Math.floor(timeRef % 60);

    let curMin = tempMin < 10 ? ('0' + tempMin) : tempMin;
    let curSec = tempSec < 10 ? ('0' + tempSec) : tempSec;
    return curMin + ':' + curSec;
  }

  canRockPlay(indexRef: number, uporsupRef: string): number {
    // console.log("indexRef",indexRef);
    // console.log("uporsupRef",uporsupRef);
    let suan: number = 1;

    if (uporsupRef === "+") {
      if (indexRef + 1 > this.searchMusic.length - 1)
        return 0;
    }
    if (uporsupRef === "-") {
      if (indexRef - 1 < 0)
        return this.searchMusic.length - 1;
      else {
        suan = - 1;
      }
    }
    // console.log("indexRef + suan",indexRef + suan);
    return indexRef + suan;
  }


  @HostListener("window:unload")
  setPlayList() {
    localStorage.setItem("playlist", JSON.stringify(this.searchMusic));
    localStorage.setItem("currentIndex", "" + this.currentIndex);
  }

  @HostListener("window:load")
  getPlayList() {
    this.searchMusic = JSON.parse(localStorage.getItem("playlist")) || [];

    this.currentIndex = +localStorage.getItem("currentIndex") || 0;

    // console.log("this.searchMusic:",this.searchMusic);
    // console.log(" this.currentIndex:", this.currentIndex)
    this.playingSer.setIdSubject.next({ "lists": this.searchMusic[this.currentIndex], play: true });
  }


}
