import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {StorageServiceModule} from 'angular-webstorage-service';
import {AgmCoreModule} from '@agm/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import { PaymentComponent } from './payment/payment.component';
import { HomeComponent } from './home/home.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { GroomingComponent } from './grooming/grooming.component';
import { VaccineComponent } from './vaccine/vaccine.component';
import { FooterComponent } from './footer/footer.component';

let firebaseConfig = {
  apiKey: "AIzaSyBonws50p_vHQ59aHgLkYUoeb4UfT9YSYQ",
  authDomain: "petstore-1aef8.firebaseapp.com",
  databaseURL: "https://petstore-1aef8.firebaseio.com",
  projectId: "petstore-1aef8",
  storageBucket: "petstore-1aef8.appspot.com",
  messagingSenderId: "74399947889",
  appId: "1:74399947889:web:d0a42deb48f2ec41070fd0",
  measurementId: "G-F8K6ZB07CG"
};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    MenuComponent,
    ProductsComponent,
    CartComponent,
    PaymentComponent,
    HomeComponent,
    AccessoriesComponent,
    GroomingComponent,
    VaccineComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    StorageServiceModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCPcVCkmJNfbE2DNbJiONFY3ZpUQE27DJ8'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
