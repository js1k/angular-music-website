
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { SuggestService } from '../../allservices/suggest.service';


@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.css']
})
export class SuggestComponent implements OnInit {
  date: Date = new Date();
 

  constructor(private suggestSer: SuggestService) { }

  ngOnInit() {
    
  // this.suggestSer.suggest().subscribe(res=>console.log("suggestRES",res))
  }

}

