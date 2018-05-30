import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-asupbar',
  templateUrl: './asupbar.component.html',
  styleUrls: ['./asupbar.component.css']
})
export class AsupBarComponent implements OnInit {
  
  @Input() barTitle     :string = "";
  @Input() routerPath   :string = "";
  @Input() routerParam  :string = "";
  constructor() { }

  ngOnInit() {
  }

}
