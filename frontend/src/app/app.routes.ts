import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { AddProductComponent } from './pages/products/product-form/product-form.component';
import { ProductsListComponent } from './pages/products/products-list.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'product',
    component: ProductsListComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'add-product',
    component: AddProductComponent,
  },
];
