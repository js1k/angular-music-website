import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
 
})
export class BoardComponent implements OnInit ,OnDestroy{

  constructor() { }

  ngOnInit() {
    // if (localStorage.getItem("huancun")) {
    //   console.log(localStorage.getItem("huancun"));
    // }
    // else
    //   console.log("不存在");
  }

  ngOnDestroy() {
    // console.log("我要离开BANGDAN页面");
    // localStorage.setItem("huancun", "wxuyaobeihuanc")
    // // this.acreSer.testApi().subscribe(res=>console.log("res",res));
  }


  
 
}
