import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { UsuarioComponent } from './Pages/usuario/usuario.component';
import { SharedModule } from '../../Reutilizable/shared/shared.module';
import { ModalUsuarioComponent } from './Modales/modal-usuario/modal-usuario.component';
import { ModalRegistrarseComponent } from './Modales/modal-registrarse/modal-registrarse.component';
import { RangoComponent } from './Pages/rango/rango.component';
import { ModalRangoComponent } from './Modales/modal-rango/modal-rango.component';
import { ClubComponent } from './Pages/club/club.component';
import { ModalClubComponent } from './Modales/modal-club/modal-club.component';
import { CompetenciaComponent } from './Pages/competencia/competencia.component';
import { ModalCompetenciaComponent } from './Modales/modal-competencia/modal-competencia.component';
import { TecnicaComponent } from './Pages/tecnica/tecnica.component';
import { ModalTecnicaComponent } from './Modales/modal-tecnica/modal-tecnica.component';
import { RolComponent } from './Pages/rol/rol.component';
import { ModalRolComponent } from './Modales/modal-rol/modal-rol.component';
import { CompetidorComponent } from './Pages/competidor/competidor.component';
import { ModalCompetidorComponent } from './Modales/modal-competidor/modal-competidor.component';
import { PeleaComponent } from './Pages/pelea/pelea.component';
import { ModalPeleaComponent } from './Modales/modal-pelea/modal-pelea.component';
import { PuntuacionComponent } from './Pages/puntuacion/puntuacion.component';
import { InformeClubComponent } from './Pages/informe-club/informe-club.component';
import { InformeCompetidorListaComponent } from './Pages/informe-competidor-lista/informe-competidor-lista.component';
import { InformeEdadComponent } from './Pages/informe-edad/informe-edad.component';
import { InformePresentacionComponent } from './Pages/informe-presentacion/informe-presentacion.component';




@NgModule({
  declarations: [
    UsuarioComponent,
    ModalUsuarioComponent,
    ModalRegistrarseComponent,
    RangoComponent,
    ModalRangoComponent,
    ClubComponent,
    ModalClubComponent,
    CompetenciaComponent,
    ModalCompetenciaComponent,
    TecnicaComponent,
    ModalTecnicaComponent,
    RolComponent,
    ModalRolComponent,
    CompetidorComponent,
    ModalCompetidorComponent,
    PeleaComponent,
    ModalPeleaComponent,
    PuntuacionComponent,
    InformeClubComponent,
    InformeCompetidorListaComponent,
    InformeEdadComponent,
    InformePresentacionComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
