import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { UsuarioComponent } from './Pages/usuario/usuario.component';
import { authGuard } from '../../custom/auth.guard';
import { RangoComponent } from './Pages/rango/rango.component';
import { ClubComponent } from './Pages/club/club.component';
import { CompetenciaComponent } from './Pages/competencia/competencia.component';
import { TecnicaComponent } from './Pages/tecnica/tecnica.component';
import { RolComponent } from './Pages/rol/rol.component';
import { CompetidorComponent } from './Pages/competidor/competidor.component';
import { PeleaComponent } from './Pages/pelea/pelea.component';
import { PuntuacionComponent } from './Pages/puntuacion/puntuacion.component';
import { InformeClubComponent } from './Pages/informe-club/informe-club.component';
import { InformeCompetidorListaComponent } from './Pages/informe-competidor-lista/informe-competidor-lista.component';
import { InformeEdadComponent } from './Pages/informe-edad/informe-edad.component';
import { InformePresentacionComponent } from './Pages/informe-presentacion/informe-presentacion.component';

const routes: Routes = [{
  path:"",
  component:LayoutComponent,
  children:[
    {
      path:'usuarios',
      component:UsuarioComponent,
      canActivate:[authGuard]
    },
    {
      path:'rangos',
      component:RangoComponent,
      canActivate:[authGuard]
    }
    ,
    {
      path:'clubes',
      component:ClubComponent,
      canActivate:[authGuard]
    }
    ,
    {
      path:'competencias',
      component:CompetenciaComponent,
      canActivate:[authGuard]
    }
    ,
    {
      path:'tecnicas',
      component:TecnicaComponent,
      canActivate:[authGuard]
    }
    ,
    {
      path:'roles',
      component:RolComponent,
      canActivate:[authGuard]
    }
    ,
    {
      path:'competidores',
      component:CompetidorComponent,
      canActivate:[authGuard]
    }
    ,
    {
      path:'peleas',
      component:PeleaComponent,
      canActivate:[authGuard]
    }
    ,
    {
      path:'puntuaciones',
      component:PuntuacionComponent,
      canActivate:[authGuard]
    }
    ,
    {
      path:'informeclub',
      component:InformeClubComponent,
      canActivate:[authGuard]
    }
    ,
    {
      
      path:'InformeCompetidorListaComponent',
      component:InformeCompetidorListaComponent,
      canActivate:[authGuard]
    }
    ,{
      
      path:'InformeEdadComponent',
      component:InformeEdadComponent,
      canActivate:[authGuard]
    }

    ,{
      
      path:'InformePresentacionComponent',
      component:InformePresentacionComponent,
      canActivate:[authGuard]
    }




  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
