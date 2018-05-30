
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AllCattype, AllplaylistService } from '../../../allservices/allplaylist.service';


@Component({
  selector: 'app-cattype',
  templateUrl: './cattype.component.html',
  styleUrls: ['./cattype.component.css']
})
export class CattypeComponent implements OnInit {

  allCattype: AllCattype[] = [];
  
  @Input() hidden ;
  @Output()hiddenChange:EventEmitter<string> = new EventEmitter<string>();

  constructor(private allplaylistService: AllplaylistService) { }

  ngOnInit() {

    this.allplaylistService.getAllCatType().subscribe(res=>this.allCattype = res);
   
  }
  hiddenitself(){
    this.hidden = false;
    this.hiddenChange.emit(this.hidden);
    return false
  }
}
