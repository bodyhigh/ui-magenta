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

// Common Material Modules
import { CommonMaterialsModule } from './modules/common-materials/common-materials.module';

import { HomeComponent } from './home/home.component';
import { AuthModule } from './modules/auth/auth.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/**
 * This method is used to allow case insensitive paths to be used in url paths
 */
export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
    return super.parse(url.toLowerCase());
  }
}

// JWT Config
export function jwtTokenGetter() {
  return localStorage.getItem(environment.jwtTokenKey)
}

const jwtConfig = {
  config: {
    tokenGetter: jwtTokenGetter,
    whitelistedDomains: environment.jwtWhitelistedDomains,
    blacklistedRoutes: environment.jwtBlacklistedRoutes
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
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
    CommonMaterialsModule
  ],
  providers: [{
    provide: UrlSerializer,
    useClass: LowerCaseUrlSerializer
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
