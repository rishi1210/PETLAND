import { Component, OnInit } from '@angular/core';
import {FormBuilder ,FormGroup ,FormControl ,Validators} from '@angular/forms';

import {AuthService} from  '../auth.service';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm:FormGroup;
  message:string=" ";
  number:any;
  userError:any;
  constructor(public fb :FormBuilder,public authService:AuthService,public router:Router,public activatedRoute:ActivatedRoute) {
    this.myForm=this.fb.group({
      email:['',Validators.required,Validators.email],
      password:['',[Validators.required,Validators.minLength(8)]]

    })
   }

  ngOnInit() {
    
}
  onSubmit(form)
  {
   this.authService.login(form.value.email,form.value.password)
    .then((data)=>{
      console.log(data);

      this.number=2;
      this.router.navigate(['/products'])

    }).catch((error)=>{
      this.userError=error;
    })
    
  }

}
