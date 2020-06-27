import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent }  from './home/home.component';
import { HeaderComponent }  from './header/header.component';
import { AboutComponent }  from './about/about.component';
import { LoginComponent } from './login/login.component';
import { Graphical18Component } from './graphical18/graphical18.component';
import { Graphical26Component } from './graphical26/graphical26.component';
import { DevicelistsComponent } from './devicelists/devicelists.component';
import { HttpClientModule }    from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { WorldMapComponent } from './world-map/world-map.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { RoutingModule } from './/routing.module';



@NgModule({
  declarations: [
    AppComponent, HomeComponent, LoginComponent, HeaderComponent, AboutComponent, Graphical18Component, Graphical26Component, DevicelistsComponent, WorldMapComponent, UserManagementComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    HttpModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
