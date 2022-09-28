import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../services/products.service";
import {Product} from "../model/products.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products!: Array<Product>;
  errorMessage!: String;
   searchFormGroup!:FormGroup;

  constructor(private productService: ProductsService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword: this.fb.control(null)
    })
   this.refrechListProduct()
  }

  refrechListProduct(){
    this.productService.getAllProducts().subscribe({
      next : (data)=>{
        this.products=data
      },
      error: (err)=>{
        this.errorMessage=err;
      }
    });
  }

  deleteProduct(p: Product) {
    let conf=confirm("Etes vous sur de vouloir supprimer le produit")
    if(conf==false)return;
    this.productService.deleteProduct(p.id).subscribe({
      next:(data)=>{
        let index=this.products.indexOf(p);
        this.products.splice(index,1);
      }
    })
  }

  handlerSetCodePromo(p:Product) {
    let promo=p.code_promo
  this.productService.setCodePromo(p.id).subscribe({
    next:(data)=>{
      p.code_promo=!promo
    },
    error:err => {
      this.errorMessage=err;
    }
  })
  }

  handlerSearchProducts() {
    let keyword = this.searchFormGroup.value.keyword;
    this.productService.searchProducts(keyword).subscribe({
      next:(data)=>{
        this.products=data
      }
    })
  }
}
