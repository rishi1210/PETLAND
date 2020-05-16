import { Component, OnInit } from '@angular/core';
import 'firebase/auth';
import 'firebase/firestore';
import {Router,ActivatedRoute} from  '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
total:string;
  constructor(public router:Router, public route:ActivatedRoute) { 
   this. total=window.localStorage.getItem("total");console.log(this.total);
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
  }

  logout()
  {
    firebase.auth().signOut();
    this.router.navigate(['/home']);
  }

}
