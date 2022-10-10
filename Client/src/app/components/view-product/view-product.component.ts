import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductView } from 'src/app/models/ProductView';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  
  
  public productId : string | null = '';
  public selectedProduct : ProductView = {} as ProductView;
  public errorMessage : string | undefined;

  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .subscribe((param : ParamMap)=>{
      this.productId = param.get('productId');
    });
    if(this.productId){
      this.productService.getProduct(this.productId)
      .subscribe((data)=>{
        this.selectedProduct = data;
      },(error)=>{
        this.errorMessage = error;
      });
    }

  }
}
