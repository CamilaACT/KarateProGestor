import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsuarioComponent } from '../../Modales/modal-usuario/modal-usuario.component';
import { Usuario } from '../../../../interfaces/usuario';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import Swal from 'sweetalert2'
import { UsurioId } from '../../../../interfaces/usuario-id';
import { UsurioNombre } from '../../../../interfaces/usuario-nombre';
import { RangoARango } from '../../../../interfaces/rango-a-rango';
import { RangoService } from '../../../../Services/rango.service';
import { ModalRangoComponent } from '../../Modales/modal-rango/modal-rango.component';
import { Rol } from '../../../../interfaces/rol';
import { RolService } from '../../../../Services/rol.service';
import { ModalRolComponent } from '../../Modales/modal-rol/modal-rol.component';


@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.css'
})
export class RolComponent implements OnInit,AfterViewInit {
  columnasTable:string[]=["Nombre","acciones"];
dataInicio:Rol[]=[];
dataListaRoles=new MatTableDataSource(this.dataInicio);

@ViewChild(MatPaginator) paginacionTabla!:MatPaginator;

constructor(
  private dialog:MatDialog,
  private _rolService:RolService,
  private _utilidadServicio:UtilidadService


){}

obtenerUsuarios(){

  this._rolService.listaRoles(1).subscribe({
    next: (data) => {
      if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
        this.dataListaRoles.data=data.result
      }else{
        this._utilidadServicio.mostrarAlerta("No se encontraron datos", "Error");
      }
    },
    error: (err) => {
      this._utilidadServicio.mostrarAlerta("Ocurrió un error", "Error Final");
      console.error(err);  // Opcional, para depurar en caso de error
}})
}
  ngOnInit(): void {
    this.dataListaRoles.filterPredicate = (data: Rol, filter: string) => {
      return data.rol_nombre.toLowerCase().includes(filter) ;
    };
    this.obtenerUsuarios();
    
  }
  ngAfterViewInit(): void {
    this.dataListaRoles.paginator=this.paginacionTabla;
  }

  aplicarFiltroTabla(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataListaUsarios.filter=filterValue.trim().toLocaleLowerCase();
    //this.buscarUsuarioPorNombre(filterValue);
  }

  aplicarFiltroTablaLocal(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaRoles.filter = filterValue.trim().toLowerCase();  // Aplicar el filtro a la tabla
  }
  

  nuevoUsuario(){
    this.dialog.open(ModalRolComponent,{
      disableClose:true
    }).afterClosed().subscribe(resultado=>{
      if(resultado ==="true")this.obtenerUsuarios();
    });
  }

  editarUsuario(rol:Rol){
    this.dialog.open(ModalRolComponent,{
      disableClose:true,
      data:rol
    }).afterClosed().subscribe(resultado=>{
      if(resultado ==="true")this.obtenerUsuarios();
    });
  }
  eliminarUsuario(rol:Rol){
    Swal.fire({

      title:"¿Desea eliminar el rol?",
      text:rol.rol_nombre,
      icon:"warning",
      confirmButtonColor:"#3085d6",
      confirmButtonText:"Si",
      showCancelButton:true,
      cancelButtonColor: "#d33",
      cancelButtonText:"No"


    }).then((resultado)=>{

      if(resultado.isConfirmed){
        this._rolService.eliminarRango(rol.rol_id).subscribe({
          next:(data)=>{
            if(data.codigoError === -1){
              this._utilidadServicio.mostrarAlerta("El rol fue eliminado","Listo!");
              this.obtenerUsuarios();
            }else{
              this._utilidadServicio.mostrarAlerta("NO se puedo eliminar el rol","Error");
            }
          },
          error:(e)=>{
            this._utilidadServicio.mostrarAlerta("NO se puedo eliminar el rol","Error Final");
          }

        })
      }
    })

  }

  /*buscarUsuarioPorNombre(nombre: string) {
    if (nombre.trim() === '') {
      this.obtenerUsuarios(); // Si el campo está vacío, cargar todos los usuarios
    } else {
      const objetoUsuNombre: UsurioNombre = { nombre: nombre.trim() };
      this._usuarioServicio.buscarUsuario(objetoUsuNombre).subscribe({
        next: (data) => {
          if (data.codigoError === -1) {
            this.dataListaUsarios.data = data.result;  // Actualizar la tabla con los resultados
          } else {
            this._utilidadServicio.mostrarAlerta("No se encontraron datos", "Error");
          }
        },
        error: (err) => {
          this._utilidadServicio.mostrarAlerta("Ocurrió un error durante la búsqueda", "Error");
          console.error(err);
        }
      });
    }
  }*/

}

