import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
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
import {AuthService} from "./auth.service";
import {RediretcService} from "./rediretc.service";

const appRoutes: Routes = [
  {
    path: 'dashboard', component: HeaderComponent, canActivate:[AuthService],
    children: [
      { path: 'home', component: HomeComponent, canActivate:[AuthService] },
      { path: 'about', component: AboutComponent, canActivate:[AuthService] },
      { path: 'live/:id',component:Graphical18Component, canActivate:[AuthService]},
      { path: 'historical/:id', component:Graphical26Component, canActivate:[AuthService]},
      { path:'devicelists', component:DevicelistsComponent,  canActivate:[AuthService]},
      {path: "users", component:UserManagementComponent, canActivate:[AuthService]}
    ]
  },
  { path: 'login', component: LoginComponent, canActivate:[RediretcService] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
