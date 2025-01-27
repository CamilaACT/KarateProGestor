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
import { ClubService } from '../../../../Services/club.service';
import { ClubAClub } from '../../../../interfaces/club-a-club';
import { ModalClubComponent } from '../../Modales/modal-club/modal-club.component';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrl: './club.component.css'
})
export class ClubComponent implements OnInit,AfterViewInit {
  columnasTable:string[]=["Nombre Club","Nombre Responsable","acciones"];
dataInicio:ClubAClub[]=[];
dataListaClub=new MatTableDataSource(this.dataInicio);

@ViewChild(MatPaginator) paginacionTabla!:MatPaginator;

constructor(
  private dialog:MatDialog,
  private _clubServicio:ClubService,
  private _utilidadServicio:UtilidadService


){}

obtenerUsuarios(){

  this._clubServicio.consultaTodoClub().subscribe({
    next: (data) => {
      if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
        this.dataListaClub.data=data.result
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
    this.dataListaClub.filterPredicate = (data: ClubAClub, filter: string) => {
      return data.clu_nombre.toLowerCase().includes(filter) || data.clu_nom_resp.toLowerCase().includes(filter);
    };
    this.obtenerUsuarios();
    
  }
  ngAfterViewInit(): void {
    this.dataListaClub.paginator=this.paginacionTabla;
  }

  aplicarFiltroTabla(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataListaUsarios.filter=filterValue.trim().toLocaleLowerCase();
    //this.buscarUsuarioPorNombre(filterValue);
  }

  aplicarFiltroTablaLocal(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaClub.filter = filterValue.trim().toLowerCase();  // Aplicar el filtro a la tabla
  }
  

  nuevoUsuario(){
    this.dialog.open(ModalClubComponent,{
      disableClose:true
    }).afterClosed().subscribe(resultado=>{
      if(resultado ==="true")this.obtenerUsuarios();
    });
  }

  editarUsuario(club:ClubAClub){
    this.dialog.open(ModalClubComponent,{
      disableClose:true,
      data:club
    }).afterClosed().subscribe(resultado=>{
      if(resultado ==="true")this.obtenerUsuarios();
    });
  }
  eliminarUsuario(club:ClubAClub){
    Swal.fire({

      title:"¿Desea eliminar el club?",
      text:club.clu_nombre,
      icon:"warning",
      confirmButtonColor:"#3085d6",
      confirmButtonText:"Si",
      showCancelButton:true,
      cancelButtonColor: "#d33",
      cancelButtonText:"No"


    }).then((resultado)=>{

      if(resultado.isConfirmed){
        this._clubServicio.eliminarClub(club.clu_id).subscribe({
          next:(data)=>{
            if(data.codigoError === -1){
              this._utilidadServicio.mostrarAlerta("El usuario fue eliminado","Listo!");
              this.obtenerUsuarios();
            }else{
              this._utilidadServicio.mostrarAlerta("NO se puedo eliminar el usuario","Error");
            }
          },
          error:(e)=>{
            this._utilidadServicio.mostrarAlerta("NO se puedo eliminar el usuario2","Error Final");
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

