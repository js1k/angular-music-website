import { Component, OnInit } from '@angular/core';
import { SearchMusicService } from '../../allservices/searchMusic.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})
export class NavBarComponent implements OnInit {

  searchSt: string = "";

  constructor(private searchMusicSer: SearchMusicService, private router: Router) { }

  ngOnInit() {

  }

  notiedSearchMusicSer() {

    // console.log("this.router.url",this.router.url)
    if (this.router.url !== "homes//musiclist") {

      this.router.navigate(['homes/musiclist']);

    }
    this.searchMusicSer.searchEvent.next(this.searchSt)

  }


}
