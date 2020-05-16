import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as firebase from 'firebase/app';
import 'firebase/auth';
//import { NavigationEnd } from '@angular/router';
import {Router,ActivatedRoute} from '@angular/router';
import {FormBuilder ,FormGroup ,FormControl ,Validators} from '@angular/forms';

let flag:number=0;
@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css']
})
export class VaccineComponent implements OnInit {

  loggedIn:boolean=false;
  user:any={};
  myForm:FormGroup;
  constructor(public router:Router,public fb :FormBuilder) {
    this.myForm=this.fb.group({
      email:['',Validators.required,Validators.email],
      name: ['',[Validators.required]],
      breed:['',[Validators.required]],
      size:['',[Validators.required]],
      vaccine:['',[Validators.required]]

    })
   }
  onSubmit(form)
  {
let name:string=form.value.name;
let  email:string=form.value.email;
let breed:string=form.value.breed;
let size:string=form.value.size;
let vaccine:string=form.value.vaccine;

firebase.firestore().collection("Vaccine-order").add({
  Name:name,
  Email:email,
 BreedName:breed,
  Size:size,
  Vaccine:vaccine,

}).then((data)=>{
  console.log(data);
  flag=1;
  console.log(flag);

}).catch((error)=>{
  console.log(error);
})

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

}
