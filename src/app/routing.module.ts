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
const appRoutes: Routes = [
  {
    path: 'dashboard', component: HeaderComponent, 
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'graph1',component:Graphical18Component},
      { path: 'graph2', component:Graphical26Component},
      { path:'devicelists', component:DevicelistsComponent},
      {path: "users", component:UserManagementComponent}
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
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
