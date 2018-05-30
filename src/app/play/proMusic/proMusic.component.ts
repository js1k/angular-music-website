import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-proMusic',
  templateUrl: './proMusic.component.html',
  styleUrls: ['./proMusic.component.css']
})
export class ProMusicComponent implements OnInit {

  /*************************************************/
  // 部分需要加单位px的数据已经在HTML绑定样式时候补上去了
  //进度条的比例系数本处不处理，由外部处理
  /*************************************************/
  //totalWidth可以设置进度条长度，也可以不设置
  @Input() totalWidth: number = 493;
  @Input() srcTotal: number = 1;

  ////读取数据,当前进度,注意传递进来和出去的数据都要按比例处理一下/。。
  @Input() valueSrcProLine: number;
  //传递数据出去,当前进度
  @Output() valueSrcProLineChange: EventEmitter<number> = new EventEmitter<number>();

  //当前btn位置
  btnLeft: number = -9;
  targetBtnWidth = 9;
  scal: number = 0;

  //是否处于拖拽状态，双向数据的进度条有可能同时修改一个数据所以需要暂停另外一个
  isDrag: boolean = false;
  @Output() isDragEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  //记录鼠标第一次按下坐标
  clientx1
  //记录鼠标第二次按下坐标
  clientx2
  constructor() { }

  ngOnInit() {
    //计算出比例
    //传递进来的可能是 1 可能是1S单位不同this.totalWidth 
    this.scal = this.totalWidth / this.srcTotal;
  }

  changeProLine(e) {
    // console.log(ev) 
    var proLineWidth = e.offsetX;
    // console.log("发送：", proLineWidth)
    //发送数据出去
    this.valueSrcProLineChange.emit(proLineWidth);
    //改变btn位置和进度条尺寸
    this.valueSrcProLine = proLineWidth

  }
  btnDown(e, btn) {
    // console.log("btnDown1");
    e.stopPropagation();
    //阻止事件冒泡到按钮下面的进度条上
    e.preventDefault();
    this.isDrag = true;
    this.isDragEvent.emit(this.isDrag);
    //拖拽状态下，暂停audio标签的ontimeupdate形成的进度条的更新
    this.clientx1 = e.clientX - btn.offsetLeft;
  }
  //监听的整个文档的鼠标移到事件
  @HostListener('document:mousemove', ['$event'])
  btnMove(e) {

    if (!this.isDrag) return;
    // console.log("btnMove2");

    let tempLineWidth;
    this.clientx2 = e.clientX;

    tempLineWidth = this.clientx2 - this.clientx1 + this.targetBtnWidth / 2;

    if (tempLineWidth < 0) {
      tempLineWidth = 0;
    }

    if (tempLineWidth > this.totalWidth) {
      tempLineWidth = this.totalWidth
    }
    // 保存进度条数据
    this.valueSrcProLine = tempLineWidth;
  }
  //监听的整个文档的鼠标释放事件
  @HostListener('document:mouseup', ['$event'])
  btnUp(e) {
    // console.log("btnUp3");
    //点击了按钮情况下释放鼠标才算是拖拽的情况
    if (!this.isDrag) return;
    //拖拽事件结束，标志位恢复
    this.isDrag = false;
    this.isDragEvent.emit(this.isDrag);

    if (this.clientx1 === this.clientx2) return;

    this.valueSrcProLineChange.emit(this.valueSrcProLine);

  }

}












