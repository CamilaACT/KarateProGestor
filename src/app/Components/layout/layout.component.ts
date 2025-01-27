import { Component } from '@angular/core';
import { UtilidadService } from '../../Reutilizable/utilidad.service';
import { Router } from '@angular/router';


interface MenuOption {
  label: string;
  icon: string;
  route: string;
  rolesAllowed: string[]; // Array de roles que pueden ver esta opción
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

    menuOptions: MenuOption[] = [
      { label: 'Usuarios', icon: 'person', route: '/pages/usuarios', rolesAllowed: ['Administrador'] },
      { label: 'Rangos', icon: 'star', route: '/pages/rangos', rolesAllowed: ['Administrador'] },
      { label: 'Clubes', icon: 'business', route: '/pages/clubes', rolesAllowed: ['Director de clubes','Administrador'] },
      { label: 'Competencias', icon: 'emoji_events', route: '/pages/competencias', rolesAllowed: [ 'Administrador'] },
      { label: 'Técnicas', icon: 'sports_martial_arts', route: '/pages/tecnicas', rolesAllowed: ['Administrador'] },
      { label: 'Roles', icon: 'supervisor_account', route: '/pages/roles', rolesAllowed: ['Administrador'] },
      { label: 'Competidores', icon: 'sports', route: '/pages/competidores', rolesAllowed: ['Administrador'] },
      { label: 'Pelea', icon: 'sports_kabaddi', route: '/pages/peleas', rolesAllowed: ['Administrador'] },
      { label: 'Informe por Clubes', icon: 'bar_chart', route: '/pages/informeclub', rolesAllowed: ['Administrador'] },
      { label: 'Informe por Competidores', icon: 'analytics', route: '/pages/InformeCompetidorListaComponent', rolesAllowed: ['Administrador'] },
      { label: 'informeEdades', icon: 'calendar_today', route: '/pages/InformeEdadComponent', rolesAllowed: [] },
      { label: 'InformePresentacionComponent', icon: 'insert_chart', route: '/pages/InformePresentacionComponent', rolesAllowed: [] },
      
  ];

  filteredMenuOptions: MenuOption[] = [];

  constructor(private utilidadService: UtilidadService, private router: Router) { }


  ngOnInit() {
    const userRole = this.utilidadService.obtenerRolUsuario();
    this.filteredMenuOptions = this.menuOptions.filter(option => option.rolesAllowed.includes(userRole));
}

  logout() {

    this.utilidadService.eliminarSesionUsuario();


    this.router.navigate(['/login']);
  }
}
