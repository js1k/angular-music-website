import { Component, OnInit} from '@angular/core';
import { BillboardService, AllBoard } from '../../allservices/billboard.service';


@Component({
  selector: 'app-boardlist',
  templateUrl: './boardlist.component.html',
  styleUrls: ['./boardlist.component.css']
})
export class BoardlistComponent implements OnInit{
  allBoard: AllBoard[] = [];
  constructor(private billboardSer: BillboardService) { }

  ngOnInit() {

      this.billboardSer.top().subscribe(res => { this.allBoard = res });
 
  }


}




