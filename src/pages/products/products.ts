import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // REQUIRED for filters to work
import { HttpClient, HttpClientModule } from '@angular/common/http';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  // Custom fields added so our UI filters work
  condition: string;
  location: string;
  dateAdded: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './products.html'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  // --- FILTER STATE ---
  selectedCategory: string = 'All';
  // We use Fake Store's actual categories here
  categories: string[] = ['All', 'electronics', 'jewelery', "men's clothing", "women's clothing"];

  priceRange: number = 100000; // Max price slider

  conditions = [
    { label: 'New', selected: false },
    { label: 'Like New', selected: false },
    { label: 'Used', selected: false }
  ];

  sortOrder: string = 'newest';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://fakestoreapi.com/products').subscribe({
      next: (data) => {
        // Map API data and inject missing fields so filters function properly
        this.products = data.map(item => {
          // Convert USD to INR roughly for the UI
          const priceInINR = item.price * 83;

          return {
            ...item,
            price: priceInINR,
            // Randomly assign conditions and locations just to make the filters demonstrable
            condition: ['New', 'Like New', 'Used'][Math.floor(Math.random() * 3)],
            location: ['DTU, Delhi', 'NSUT, Delhi', 'IGDTUW, Delhi'][Math.floor(Math.random() * 3)],
            dateAdded: Date.now() - Math.floor(Math.random() * 10000000000)
          };
        });
      }
    });
  }

  // --- FILTER LOGIC ---
  // This getter automatically recalculates whenever a user touches a filter
  get filteredProducts(): Product[] {
    return this.products
      // 1. Filter by Category
      .filter(p => this.selectedCategory === 'All' || p.category === this.selectedCategory)
      // 2. Filter by Price
      .filter(p => p.price <= this.priceRange)
      // 3. Filter by Condition
      .filter(p => {
        const activeConditions = this.conditions.filter(c => c.selected).map(c => c.label);
        if (activeConditions.length === 0) return true; // If none checked, show all
        return activeConditions.includes(p.condition);
      })
      // 4. Sort the results
      .sort((a, b) => {
        if (this.sortOrder === 'price-low') return a.price - b.price;
        if (this.sortOrder === 'price-high') return b.price - a.price;
        return b.dateAdded - a.dateAdded; // Defaults to newest
      });
  }

  setCategory(category: string) {
    this.selectedCategory = category;
  }
}
