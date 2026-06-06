import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home';
import { ProductsComponent } from '../pages/products/products';
import { LoginComponent } from '../pages/login/login';
import { SignupComponent } from '../pages/signup/signup';

// Make sure these paths match your actual file structure!


export const routes: Routes = [
  { path: '', component: HomeComponent },               // Default route (Home)
  { path: 'products', component: ProductsComponent },   // /products
  { path: 'login', component: LoginComponent },         // /login
  { path: 'signup', component: SignupComponent },       // /signup
  { path: '**', redirectTo: '' }                        // Wildcard: redirects bad URLs to Home
];
