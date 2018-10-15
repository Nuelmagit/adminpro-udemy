import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesModule } from './pages/pages.module';
import { ServiceModule } from './services/service.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ServiceModule,
    APP_ROUTES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
