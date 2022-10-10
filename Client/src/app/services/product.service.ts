import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import {Product} from "../../../../server/database/models/Product";
import { ProductView } from '../models/ProductView';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  search = new BehaviorSubject("")

  constructor(private httpClient:HttpClient) { }

  public createProduct(product : ProductView):Observable<ProductView>{
    let serverURL : string = `http://127.0.0.1:5000/api/v1/products`;
    return this.httpClient.post<ProductView>(serverURL, product).pipe(
      catchError(this.handleError)
    );
  }

  public updateProduct(productId:string, product: ProductView):Observable<ProductView>{
    let serverURL : string = `http://127.0.0.1:5000/api/v1/products/${productId}`;
    return this.httpClient.put<ProductView>(serverURL, product).pipe(
      catchError(this.handleError) 
    );
  }


  public getAllProducts():Observable<ProductView[]>{
    let serverURL : string = `http://127.0.0.1:5000/api/v1/products`;
    return this.httpClient.get<ProductView[]>(serverURL).pipe(
      catchError(this.handleError) 
    );
  }

  public getProduct(productId:string):Observable<ProductView>{
    let serverURL : string = `http://127.0.0.1:5000/api/v1/products/${productId}`;
    return this.httpClient.get<ProductView>(serverURL).pipe(
      catchError(this.handleError) 
    );
  }

  public deleteProduct(productId:string):Observable<ProductView>{
    let serverURL : string = `http://127.0.0.1:5000/api/v1/products/${productId}`;
    return this.httpClient.delete<ProductView>(serverURL).pipe(
      catchError(this.handleError) 
    );
  }

   


  private handleError(error: HttpErrorResponse){
    let errorMessage: string = '';
    if(error.status === 0) {
      // A client-side of error occurred, Handle it accordingly
      errorMessage = `An error occurred: ${error.error}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    errorMessage += '\n Something bad happened; Please try again later';
    return throwError(errorMessage)
  }
}
