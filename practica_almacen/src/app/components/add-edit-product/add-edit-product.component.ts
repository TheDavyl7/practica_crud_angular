import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProgressBarComponent, RouterLink],
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent {
  forms: FormGroup;
  loading: boolean = false;
  id: number;
  operation: string;

  constructor(private fb: FormBuilder, private _productService: ProductService, private toastr: ToastrService, private aRouter: ActivatedRoute, private router: Router){
    this.forms = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
    })

    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    if (this.id<=0) {
      this.operation = "Añadir producto";
    } else{
      this.operation = "Editar producto";
      this.getProduct(this.id);
    }
  }

  addProduct(){
    
    this.loading = true;
    const product: Product = {
      name: this.forms.value.name,
      description: this.forms.value.description,
      price: this.forms.value.price,
      stock: this.forms.value.stock
    }

    this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
    if (this.id<=0) {
      this._productService.saveProduct(product).subscribe(()=>{
        console.log("Producto añadido.")
        this.toastr.success(`Producto ${product.name} añadido correctamente`, "Producto añadido");        
        this.loading=false;
        this.clearProduct();
      });
    } else{
      this._productService.updateProduct(this.id, product).subscribe(()=>{
        console.log("Producto actualizado.")
        this.toastr.success(`Producto ${product.name} actualizado correctamente`, "Producto actualizado");
        this.loading=false;
        this.router.navigate((['/']));
      });      
    }
      
  }

  getProduct(id: number){
    this.loading = true;
    this._productService.getProduct(id).subscribe((data: Product)=>{
      const product: Product = data;
      this.forms.controls['name'].setValue(product.name);
      this.forms.controls['description'].setValue(product.description);
      this.forms.controls['price'].setValue(product.price);
      this.forms.controls['stock'].setValue(product.stock);
      this.forms.markAsUntouched();
      this.loading = false;
    });
  }

  clearProduct(){
    this.forms.controls['name'].setValue('');
    this.forms.controls['description'].setValue('');
    this.forms.controls['price'].setValue(null);
    this.forms.controls['stock'].setValue(null);
    this.forms.markAsUntouched();
  }
}
