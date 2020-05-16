import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as firebase from 'firebase/app';
import 'firebase/auth';
//import { NavigationEnd } from '@angular/router';
import {Router,ActivatedRoute} from '@angular/router';
let lalcount:any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {

  user:any;
  loggedIn:boolean=false;
  constructor(  public router:Router) { 
  this.user=firebase.auth().currentUser;

  if(this.user)
  {
    this.loggedIn=true;
  }else{
    this.loggedIn=false;
  }

  firebase.auth().onAuthStateChanged((user)=>{
    if(user)
    {
      this.loggedIn=true;
    }else{
      this.loggedIn=false;
    }
  })
  }
 
  ngOnInit() {
    
  

    $(window).scroll(function() {
      
      if ($(document).scrollTop() > 50) {
          $('.nav').addClass('affix');
          console.log("OK");
      } else {
          $('.nav').removeClass('affix');
      }
  });
lalcount=JSON.parse(localStorage.getItem("total"));
  }
  logout()
  {
  var db = openDatabase("Rishi.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    db.transaction(function (tx){ tx.executeSql( 'DROP TABLE items')});
    window.localStorage.setItem("total",'0');
   
    firebase.auth().signOut();
    this.router.navigate(['/home']);

  }

}

