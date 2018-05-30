
import { Component, OnInit } from '@angular/core';
import { SingerlistService, usrInfor } from '../../allservices/singerlist.service';


@Component({
  selector: 'app-singerlist',
  templateUrl: './singerlist.component.html',
  styleUrls: ['./singerlist.component.css']
})
export class SingerlistComponent implements OnInit {
  userInfoList:usrInfor[] = [];
  constructor(private singerlistService: SingerlistService) { }

  ngOnInit() {
   
    this.userInfoList = this.singerlistService.userInfoList;
   
  }

}
