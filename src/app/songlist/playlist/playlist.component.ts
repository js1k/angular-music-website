import { Component, OnInit, ViewChild } from '@angular/core';
import { CattypeComponent } from './cattype/cattype.component';
import { ActivatedRoute } from '@angular/router';
import { SongCollection, AllplaylistService } from '../../allservices/allplaylist.service';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  SongCollection: SongCollection[] = [];
  selectShow: boolean = false;

  title: string = "";

  constructor(private routeInfo: ActivatedRoute, private AllplaylistSer: AllplaylistService) { }

  selectCatWindow() {
    this.selectShow = !this.selectShow;
    return false;
  }

  ngOnInit() {
    this.routeInfo.paramMap.subscribe(param => {
      this.title = param["params"]["cattype"];
      this.AllplaylistSer.getSongCollectionList(this.title, 0, 0).subscribe(res => this.SongCollection = res)
    })

  }

}
