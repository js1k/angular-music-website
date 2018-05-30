import { AcreatrequestService } from './allservices/acreatrequest.service';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit {
  constructor(private acreSer: AcreatrequestService) {
  }
  ngOnInit() {
    //  this.acreSer.testApi().subscribe(res=>console.log("评论res->",res))
  }

}


