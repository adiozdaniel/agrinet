import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, PrimaryButtonComponent, NgIf],
  templateUrl: './header.component.html',
  styles: `img {
    width: 60px;
    height: 60px;
    transition: transform 0.9s ease;
    transform: rotate(270deg);
    cursor: pointer;
  }`,
})
export class HeaderComponent {
  constructor(private router: Router) {}
  cartService = inject(CartService);

  isLandingPage(): boolean {
    return this.router.url === '/';
  }

  isProductsPage(): boolean {
    return this.router.url === '/product';
  }

  isCartCheckout(): boolean {
    return this.router.url === '/cart';
  }

  onSignOut() {
    console.log('Signing out...');
    // Add your sign-out logic (e.g., clear tokens, redirect)
    this.router.navigate(['/auth']);
  }
}
