
import {forkJoin as observableForkJoin,  Observable } from 'rxjs';
import { AllplaylistService, SongCollection } from './../../allservices/allplaylist.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-topMusic',
  templateUrl: './topMusic.component.html',
  styleUrls: ['./topMusic.component.css']
})
export class TopMusicComponent implements OnInit {
  songCollection: SongCollection[] = [];
  constructor(private allplaylistSer: AllplaylistService) { }

  ngOnInit() {

    observableForkJoin(
      this.allplaylistSer.getSongCollectionList("华语", 2),
      this.allplaylistSer.getSongCollectionList("欧美", 1,2),
      this.allplaylistSer.getSongCollectionList("流行", 2,10),
      this.allplaylistSer.getSongCollectionList("民族", 2,2), 
      this.allplaylistSer.getSongCollectionList("摇滚", 1),
    ).subscribe(res=>this.songCollection =  res[0])

  }

}
