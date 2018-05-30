
import { Component, OnInit } from '@angular/core';
import { usrInfor } from '../../allservices/singerlist.service';
import { LivelistService } from '../../allservices/livelist.service';



@Component({
  selector: 'app-livelist',
  templateUrl: './livelist.component.html',
  styleUrls: ['./livelist.component.css']
})
export class LivelistComponent implements OnInit {
  liveList: usrInfor[] = [];
  constructor(private livelistService: LivelistService) { }

  ngOnInit() {

    this.liveList = this.livelistService.liveList;
  }

}
