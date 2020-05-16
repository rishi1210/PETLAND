import { Component, OnInit } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import {FormBuilder ,FormGroup ,FormControl ,Validators} from '@angular/forms';

import { ThrowStmt } from '@angular/compiler';
import {AuthService} from '../auth.service';
import *  as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  [x: string]: any;

  myForm: FormGroup;
  message:string="";
  userError:any;
  constructor( public fb:FormBuilder,public authService:AuthService) {
    this.myForm=this.fb.group({
      firstName: ['',[Validators.required]],
      lastName:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required ,Validators.minLength(8)]],
      confirmpassword:['',[Validators.required]]
    })
   }

  ngOnInit() {
    
  }
  getconfirmation(note:any)
  {
    alert(note);
  }
  /*geterror(error:any)
  {
    alert(error);
  }*/
  onSubmit(signupform)
  {
    let email:  string =signupform.value.email;
    let password: string=signupform.value.password;
    let firstName: string=signupform.value.firstName;
    let lastName: string=signupform.value.lastName;

   let number:any;

   
   this.authService.signup(email,password,firstName,lastName)
    .then(() =>{
        this.message="You have signed up successfully.Please login."
       // number=2;
        this.getconfirmation("You have signed up successfully.Please login.");
        console.log(this.firstname+""+this.lastname);
      }).catch((error) => {
      console.log(error);
      this.userError=error;
      this.getconfirmation("Oops!! Email has already registered");
    })
  }
}