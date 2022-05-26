import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent}from'./vistas/login/login.component';
import {EditarComponent}from'./vistas/editar/editar.component';
import {DashboardComponent}from'./vistas/dashboard/dashboard.component';
import {NuevoComponent}from'./vistas/nuevo/nuevo.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'editar/:id',component:EditarComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'nuevo',component:NuevoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =[LoginComponent,EditarComponent,DashboardComponent,NuevoComponent]