import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, pipe, tap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient){ }
  
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('api/products/products.json').pipe(
      tap((result)=>console.log(JSON.stringify(result))),
      catchError(this.handleError));
  }
  handleError(handlerError: HttpErrorResponse) {
    return throwError(() => 
      handlerError.error instanceof ErrorEvent? handlerError.error.message
      : handlerError.message);
  }
}