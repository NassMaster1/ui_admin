import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Observable, of, throwError} from "rxjs";
import {Product} from "../model/products.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

   private products! : Array<Product>

  constructor() {
    this.products=[
      {id:1,name:"sweat",price:20,code_promo:true},
      {id:2,name:"robe kabyle",price:30,code_promo:false},
      {id:3,name:"sac à main",price:40,code_promo:true},
    ]
  }

  public getAllProducts() :Observable<Array<Product>>{
     return of(this.products);
  }

  public deleteProduct(id:number):Observable<boolean> {
     this.products.filter(p=>p.id!=id);
     return of(true);
  }

  public setCodePromo(id:number) :Observable<boolean> {
     let product=this.products.find(p=>p.id==id);
     if(product!=undefined){
        product.code_promo=!product.code_promo;
        return of(true);
     }else return throwError(()=>new Error("Product not Found"));
  }

  public searchProducts(keyword:string) :Observable<Product[]>{

     let products = this.products.filter(p=>p.name.includes(keyword));
     return of(products)
  }
}
