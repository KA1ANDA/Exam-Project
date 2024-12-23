import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { ManagerPageComponent } from './pages/manager-page/manager-page.component';
import { TableModule } from 'primeng/table';
import { BookListComponent } from './components/book-list/book-list.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DialogPopUpComponent } from './components/dialog-pop-up/dialog-pop-up.component';
import { CustomerBookListComponent } from './components/customer-book-list/customer-book-list.component';
import { Card } from 'primeng/card';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ManagerPageComponent,
    BookListComponent,
    DialogPopUpComponent,
    CustomerBookListComponent,
    CustomerPageComponent,
    CartPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    InputTextModule,
    FormsModule,
    Dialog,
    ButtonModule,
    ReactiveFormsModule,
    Card,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    providePrimeNG({
        theme: {
            preset: Aura,
            options: {
              darkModeSelector: false || 'none'
          }
        }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
