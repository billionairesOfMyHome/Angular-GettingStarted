import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{
  pageTitle: string = 'Product List';
  imgWidth = 50;
  imgMargin = 2;
  showImage = true;
  error = '';
  sub!: Subscription;

  private _listFilter = '';
  get listFilter(): string{
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe(
      {
        next: (products) => {
          this.products = products;
          this.filteredProducts = this.products;
          this.listFilter = 'cart';
        },
        error:(error) => this.error = error 
      }
    );
    console.log('this is ngOninit');
    // this.listFilter = 'cart';
    // this.filteredProducts = this.products;
    console.log('private backing varible:',this._listFilter);
    
  }
  
  toggleImage() {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => 
      product.productName.toLocaleLowerCase().includes(filterBy));
  }

  onRatingClicked(message: string){
    console.log('Receive the event data:', message);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}