import { Component, OnInit, Input } from '@angular/core';
import {Router,ActivatedRoute} from  '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as $ from 'jquery';
//import { FnParam } from '@angular/compiler/src/output/output_ast';
//import { worker } from 'cluster';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
   param:any[]=[];
 array:any=[ ];  
   public data() {
    
  //  this.array['rishi','sz']
   var total=0;
   var db = openDatabase("Rishi.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
 
        db.transaction(function (tx) {
          tx.executeSql("SELECT * FROM items",[], function(tx, results) {
              if(results.rows.length > 0) {
                var s='<table class="table table-hover">';  
                s+='<tr><th style="color:white;" scope="col">#</th><th scope="col" style="color:white;">Petname</th><th style="color:white;" scope="col">Price</th><th style="color:white;" scope="col">Option</th></tr>';
                for(var i = 0; i < results.rows.length; i++) {
                        var number=1;
                           var work=results.rows.item(i);
                           s+='<tr>';
                           s+='<td style="color:white;">'+(i+1)+'</td>';
                           s+='<td style="color:white;">'+work.petname+'</td>';
                           s+='<td style="color:white;">'+work.rate+'</td>';
                           s+='<td *ngIf="number==1"><button type="submit" style="border-radius:20px; border:0.2px white; height:55%; width:50%;" onclick= "(function(){  var db = openDatabase('+"'Rishi.db'"+' ,'+"'1.0'"+','+"'My WebSQL Database'"+' ,'+"2 * 1024 * 1024"+'); db.transaction( function (tx) { tx.executeSql(  '+ "'DELETE from items where id=?'"  +',['+ work.id+'])}) ; window.location.reload(); firebase.firestore().collections('+"product"+').where('+"owner"+','+" '=='" +','+"user"+').delete()})()">Remove</button></td>';
                           console.log(work);

                            total=total+results.rows.item(i).rate ; 
                                window.localStorage.setItem("total",total);
                                                     console.log("Result -> " + results.rows.item(i).rate + " " + results.rows.item(i).petname);
                                                                 
                }
                  s+='</tr>';
                 s+='<td style="color:white;">#####</td>';
                 s+='<td><h4 style="color:white;">Total/-</h4></td>';
                  s+='<td><h4 style="color:white;">'+ total +'</h4></td>';
                 s+='<td style="border-radius:50px; color:white;"> #####</td>';
                  s+='</table>';
               //   s+='<div  *ngIf="flag!=0" style=" padding-left: 40%; padding-top:2%; "> <a href="payment.component.html"><button   style="height: 45px; width:28%;border-radius: 90px; border:1px white;">Place Your order</button></a></div>';

             
                                                
                  document.getElementById('table').innerHTML=s;
                // mycontainer=s;

              }
          });
      });

  
    
    //throw new Error("Method not implemented.");
  }
  savedata(){
console.log("your data is saved");
var db = openDatabase("Rishi.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
 
        db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM items",[], function(tx, results) {
              if(results.rows.length > 0) {
                for(var i = 0; i < results.rows.length; i++) {
                  firebase.firestore().collection("product").add({
                    ProductName:results.rows.item(i).petname,
                     //quantity:this.quantity,
                     owner:firebase.auth().currentUser.uid,
                     Price:results.rows.item(i).rate,
                    // created:firebase.firestore.FieldValue.serverTimestamp(),
                   }).then((data)=>{
                     console.log(data);
                //     alert('Succesfully inserted in database');
                    // this.modalflag=true;
                     
                   }).catch((error)=>{
                 
                     console.log(error);
                   })
                                                                                            
                }
              }
          });
      });
this.router.navigate(['/payment']);

  }

   constructor(public activatedRoute: ActivatedRoute,public router:Router) { 
   this.data();
  /* var user:any;
  var total:string;
  var s:string;var totalfi=0;
user=firebase.auth().currentUser.uid;
firebase.firestore().collection("product").where('owner','==',user).get().then(function(querySnapshot){
querySnapshot.forEach(function(doc){
//this.array.push(doc.data());
this.array.push(doc.data().ProductName);
console.log(this.array);

})
}).catch(function(error){
console.log("error in getting documents",error);
})*/
  
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
   
  /*var user:any;
  var total:string;
  var s:string;var totalfi=0;var array=[];
user=firebase.auth().currentUser.uid;
var s='<table class="table table-hover">';  
s+='<tr><th style="color:white;" scope="col">#</th><th scope="col" style="color:white;">Petname</th><th style="color:white;" scope="col">Price</th><th style="color:white;" scope="col">Option</th></tr>';
firebase.firestore().collection("product").where('owner','==',user).get().then(function(querySnapshot){
querySnapshot.forEach(function(doc){
//this.array.push(doc.data());
array.push(doc.data().ProductName);
console.log(array);

})
}).catch(function(error){
console.log("error in getting documents",error);
})
for(var j=0;j<array.length;j++)
{
  s+='<tr>';
  console.log("rishi");
  s+='<td style="color:white;">'+(j+1)+'</td>';
  s+='<td style="color:white;">'+ array[j]+'</td>';
  s+='<td style="color:white;">doc.data().Price</td>';
  s+='</tr>';
  //s+='<td *ngIf="number==1"><button type="submit" style="border-radius:20px; border:0.2px white; height:55%; width:50%;" onclick= "(function(){  var db = openDatabase('+"'Rishi.db'"+' ,'+"'1.0'"+','+"'My WebSQL Database'"+' ,'+"2 * 1024 * 1024"+'); db.transaction( function (tx) { tx.executeSql(  '+ "'DELETE from items where id=?'"  +',['+ work.id+'])}) ; window.location.reload(); firebase.firestore().collections('+"product"+').where('+"owner"+','+" '=='" +','+"user"+').delete()})()">Remove</button></td>';
 // totalfi=totalfi+JSON.parse(doc.data().Price);
  console.log(totalfi);
  
}
s+='<td style="color:white;">#####</td>';
s+='<td><h4 style="color:white;">Total/-</h4></td>';
s+='<td><h4 style="color:white;">'+ totalfi +'</h4></td>';
s+='<td style="border-radius:50px; color:white;"> #####</td>';
s+='</table>';
//
document.getElementById('table').innerHTML=s;*/

        }
        
    
      

}
