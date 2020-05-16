import { Component, OnInit, Output } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {Router,ActivatedRoute} from  '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import * as $ from 'jquery';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
  
})
export class ProductsComponent implements OnInit {
  user:any={};
  productname: any;
  price: any;
  items: any[];
  proinfo: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[];
  modalflag: boolean;
  transfer=Array[15];
  proname:any;
  rate:any;
  loggedIn:boolean=false;
  cartnum:number=0;
  constructor(public router:Router, public route:ActivatedRoute) {
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
   accessories(){
    this.router. navigate(['/accessories']);
   }
   logout()
   {
    var db = openDatabase("Rishi.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    db.transaction(function (tx){ tx.executeSql(' Drop TABLE items')});
    window.localStorage.setItem("total",'0');
    
     firebase.auth().signOut();
    
     this.router.navigate(['/home']);
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
 save1(price
    ,productname){
    firebase.firestore().collection("product").add({
     ProductName:productname,
      owner:firebase.auth().currentUser.uid,
      Price:price,
      created:firebase.firestore.FieldValue.serverTimestamp(),
    }).then((data)=>{
      console.log(data);

    }).catch((error)=>{
  
      console.log(error);
    })
    this.transfer=[ productname,
      price
      ]
     
    console.log(this.transfer);
 
    window.localStorage.setItem(price,productname);
  var db = openDatabase("Rishi.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
 db.transaction(function (tx) {
     tx.executeSql("CREATE TABLE IF NOT EXISTS items (id integer primary key, rate integer, petname string)");
 });

 db.transaction(function (tx) {
        tx.executeSql("INSERT INTO items (rate, petname) VALUES (?,?)", [price, productname]);
    });
 window.localStorage.setItem( "cartnum",this.cartnum+1);
 this.cartnum=JSON.parse(window.localStorage.getItem("cartnum"));
 }
}

