import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Common, CommonService, CommonColet } from '../../allservices/common.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit, OnDestroy{

  commonColet: CommonColet = null;
  commonShow: number = -1;

  test: any;
  
 

  @Input() type:string = "";
  @Input() id:string = "";

  //点击回复的时候输入框展示回复的对应人
  commonTo: string = ""

  constructor(private commonSer: CommonService) { }

  ngOnInit() {

    // this.getCommon();
    // this.commonSer.commonSubject.subscribe(res=>console.log("收到的评论的id:",res) );

    this.test = this.commonSer.commonSubject.subscribe(res=> this.commonSer.getCommon(this.type,res).subscribe(res => this.commonColet = res) );
  }        
    //  this.commonSer.getCommon("a").subscribe(res=>console.log("组件获得数据:",res));
  

  showHiden(userRef, indexRef) {

    if ( this.commonShow === -1 || this.commonShow !== indexRef ) {

      this.commonShow = indexRef;
      this.commonTo = userRef;
    }
    else {
      this.commonShow = -1
    }

    return false;
  }

  ngOnDestroy(){
      this.test.unsubscribe();
  }

}
