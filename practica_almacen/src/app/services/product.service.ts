import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private myAppURL: string;
  private myApiURL: string;

  constructor(private http: HttpClient) { 
    this.myAppURL = environment.apiUrl;
    this.myApiURL = '/api/products/';
  }

  getListProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.myAppURL + this.myApiURL);
  }

  deleteProduct(id: number): Observable<void>{
    return this.http.delete<void>(this.myAppURL + this.myApiURL + id);
  }

  saveProduct(product: Product): Observable<void>{
    return this.http.post<void>(this.myAppURL + this.myApiURL, product);
  }

  getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(this.myAppURL + this.myApiURL + id);
  }

  updateProduct(id: number, product: Product): Observable<void>{
    return this.http.put<void>(this.myAppURL + this.myApiURL + id, product);
  }
}
