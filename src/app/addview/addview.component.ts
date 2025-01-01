import { Component, OnInit } from '@angular/core';
import { ProdService } from '../prod.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addview',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './addview.component.html',
  styleUrl: './addview.component.css'
})
export class AddviewComponent implements OnInit{
  products: any[] = [];

  constructor(private productService: ProdService) {}

  ngOnInit(): void {
    // Subscribe to product updates
    this.productService.products$.subscribe((data) => {
      this.products = data;
    });

    // Initial load of products
    this.productService.refreshProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data; // Update the product list
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}