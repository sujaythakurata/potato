import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent }  from './home/home.component';
import { HeaderComponent }  from './header/header.component';
import { AboutComponent }  from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { Graphical18Component } from './graphical18/graphical18.component';
import { Graphical26Component } from './graphical26/graphical26.component';
import { DevicelistsComponent } from './devicelists/devicelists.component';
import { HttpClientModule }    from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { WorldMapComponent } from './world-map/world-map.component';

const appRoutes: Routes = [
  {
    path: 'dashboard', component: HeaderComponent, 
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'graph1',component:Graphical18Component},
      { path: 'graph2', component:Graphical26Component},
      { path:'devicelists', component:DevicelistsComponent}
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent, HomeComponent, LoginComponent, HeaderComponent, AboutComponent, Graphical18Component, Graphical26Component, DevicelistsComponent, WorldMapComponent
  ],
  imports: [
    BrowserModule,  RouterModule.forRoot(appRoutes), HttpClientModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
