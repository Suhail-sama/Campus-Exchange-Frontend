import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// 1. Define the structure of the data coming from the API
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // 2. Add HttpClientModule here
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {
  // Array to hold our fetched products
  products: Product[] = [];

  // Inject HttpClient
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // 3. Fetch data from the API (I added ?limit=5 to match your 5-card layout)
    this.http.get<Product[]>('https://fakestoreapi.com/products?limit=5')
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          console.error('There was an error fetching the products!', error);
        }
      });
  }
}
