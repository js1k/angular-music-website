import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-proVol',
  templateUrl: './proVol.component.html',
  styleUrls: ['./proVol.component.css']
})
export class ProVolComponent implements OnInit {

  @Input() totalHeight: number = 74;

  @Input() srcTotal: number = 1;
  ////读取数据,当前进度,注意传递进来和出去的数据都要按比例处理一下/。。
  @Input() valueSrcProLine: number;
  //传递数据出去,当前进度
  @Output() valueSrcProLineChange: EventEmitter<number> = new EventEmitter<number>();

  //当前btn位置
  targetBtnWidth = 9;

  //是否处于拖拽状态，双向数据的进度条有可能同时修改一个数据所以需要暂停另外一个
  isDrag: boolean = false;
  //记录鼠标第一次按下坐标
  clientY1
  //记录鼠标第二次按下坐标
  clientY2
  constructor() { }

  ngOnInit() {
  }
  changeProLine(e) {
    // console.log(ev) 
    var proLineHeight = e.offsetY;
    //发送数据出去
    this.valueSrcProLineChange.emit(proLineHeight);
    //改变btn位置和进度条尺寸
    this.valueSrcProLine = proLineHeight
  }

  btnDown(e, btn) {
    e.stopPropagation();
    //阻止事件冒泡到按钮下面的进度条上
    e.preventDefault();
    this.isDrag = true;

    this.clientY1 = e.clientY - btn.offsetTop;
   
  }
  //监听的整个文档的鼠标移到事件
  @HostListener('document:mousemove', ['$event'])
  btnMove(e) {

    if (!this.isDrag) return;

    let tempLineHeight;
    this.clientY2 = e.clientY;

    tempLineHeight = this.clientY2 - this.clientY1 + this.targetBtnWidth / 2;

    if (tempLineHeight < 0) {
      tempLineHeight = 0;
    }
    if (tempLineHeight > this.totalHeight) {
      tempLineHeight = this.totalHeight
    }
    // 保存进度条数据
    this.valueSrcProLine = tempLineHeight;
    this.valueSrcProLineChange.emit(this.valueSrcProLine);
  }
  //监听的整个文档的鼠标释放事件
  //////////////////////////////////////////
  @HostListener('document:mouseup', ['$event'])
  btnUp(e) {
   
    //点击了按钮情况下释放鼠标才算是拖拽的情况
    if (!this.isDrag) return;
    //拖拽事件结束，标志位恢复
    this.isDrag = false;

    if (this.clientY1 === this.clientY2) return;
  }

}














