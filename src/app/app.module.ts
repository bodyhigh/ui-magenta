import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DefaultUrlSerializer, UrlTree, UrlSerializer } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { AdminModule } from './modules/admin/admin.module';

// Angular Material Modules
import { MatButtonModule,
  MatCardModule,
  MatFormFieldModule, 
  MatIconModule,
  MatInputModule, 
  MatListModule, 
  MatMenuModule, 
  MatSidenavModule, 
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AuthModule } from './modules/auth/auth.module';

/**
 * This method is used to allow case insensitive paths to be used in url paths
 * @class LowerCaseUrlSerializer
 */
export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
    return super.parse(url.toLowerCase());
  };
}

// JWT Config
const jwtConfig = {
  config: {
    tokenGetter: () => localStorage.getItem(environment.jwtTokenKey),
    whitelistedDomains: environment.jwtWhitelistedDomains,
    blacklistedRoutes: environment.jwtBlacklistedRoutes
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot(jwtConfig),
    // Modules
    AuthModule,
    AppRoutingModule,
    AdminModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule, 
    MatIconModule,
    MatInputModule, 
    MatListModule, 
    MatMenuModule, 
    MatSidenavModule, 
    MatSnackBarModule,
    MatToolbarModule
  ],
  providers: [{
    provide: UrlSerializer,
    useClass: LowerCaseUrlSerializer
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
