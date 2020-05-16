import { Component, OnInit } from '@angular/core';
import {AgmCoreModule} from '@agm/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
lat:number=17.3850;
long:number=78.4867;
  ngOnInit() {
    
   
  }

}
