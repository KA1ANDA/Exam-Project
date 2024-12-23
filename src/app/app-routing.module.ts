import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerPageComponent } from './pages/manager-page/manager-page.component';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

const routes: Routes = [
  {path:"manager" , component:ManagerPageComponent},
  {path:"customer" , component:CustomerPageComponent},
  {path:"cart" , component:CartPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
