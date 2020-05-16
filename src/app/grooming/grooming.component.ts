import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as firebase from 'firebase/app';
import 'firebase/auth';
//import { NavigationEnd } from '@angular/router';
import {Router,ActivatedRoute} from '@angular/router';
import {FormBuilder ,FormGroup ,FormControl ,Validators} from '@angular/forms';

@Component({
  selector: 'app-grooming',
  templateUrl: './grooming.component.html',
  styleUrls: ['./grooming.component.css']
})
export class GroomingComponent implements OnInit {
  user:any;
  loggedIn:boolean=false;
  myForm:FormGroup;
  flag:boolean=false;
  constructor(public router:Router,public fb :FormBuilder) { 

  this.myForm=this.fb.group({
      email:['',Validators.required,Validators.email],
      name: ['',[Validators.required]],
      breed:['',[Validators.required]],
      size:['',[Validators.required]],
      plans:['',[Validators.required]]

    })
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
    this.flag=true;
   
  }
  logout()
  {
  var db = openDatabase("Rishi.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
    db.transaction(function (tx){ tx.executeSql( 'DROP TABLE items')});
    window.localStorage.setItem("total",'0');
   
    firebase.auth().signOut();
    this.router.navigate(['/home']);

  }
  onSubmit(form)
  {
let name:string=form.value.name;
let  email:string=form.value.email;
let breed:string=form.value.breed;
let size:string=form.value.size;
let plans:string=form.value.plans;

firebase.firestore().collection("Grooming-order").add({
  Name:name,
  Email:email,
 BreedName:breed,
  Size:size,
  Plans:plans,

}).then((data)=>{
  console.log(data);
  this.flag=true;
  console.log(this.flag);

}).catch((error)=>{
  console.log(error);
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
  }

}
