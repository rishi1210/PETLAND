import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MenuComponent } from './menu/menu.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './auth.guard';
import {PaymentComponent} from './payment/payment.component';
import { HomeComponent } from './home/home.component';
import {GroomingComponent} from './grooming/grooming.component';
import{VaccineComponent} from './vaccine/vaccine.component';


const routes: Routes = [
 {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'' ,component:MenuComponent},
  {
  path:'home',component : HomeComponent
},
  {
    path:'signup' , component:SignupComponent
  },{
  path: 'login' ,component:LoginComponent
},
{
  path: 'products' ,component:ProductsComponent,
  canActivate: [AuthGuard]
},
{
  path:'accessories',component:AccessoriesComponent,
  canActivate:[AuthGuard]
},
{
  path:'grooming',component:GroomingComponent,
  canActivate:[AuthGuard]
},
{
  path:'vaccine',component:VaccineComponent,
  canActivate:[AuthGuard]
},
{
  path: 'cart' ,component:CartComponent,
  canActivate: [AuthGuard]
},
{
  path:'payment',component:PaymentComponent,
},
{path:'**',redirectTo:'home'}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
