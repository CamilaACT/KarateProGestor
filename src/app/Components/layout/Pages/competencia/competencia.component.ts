import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import Swal from 'sweetalert2'

import { ClubService } from '../../../../Services/club.service';
import { ClubAClub } from '../../../../interfaces/club-a-club';
import { ModalClubComponent } from '../../Modales/modal-club/modal-club.component';
import { CompetenciaACompetencia } from '../../../../interfaces/competencia-a-competencia';
import { CompetenciaService } from '../../../../Services/competencia.service';
import { ModalCompetenciaComponent } from '../../Modales/modal-competencia/modal-competencia.component';

@Component({
  selector: 'app-competencia',
  templateUrl: './competencia.component.html',
  styleUrl: './competencia.component.css'
})
export class CompetenciaComponent implements OnInit,AfterViewInit {
  columnasTable:string[]=["Nombre","Fecha","Descripcion","acciones"];
dataInicio:CompetenciaACompetencia[]=[];
dataListaCompetencia=new MatTableDataSource(this.dataInicio);

@ViewChild(MatPaginator) paginacionTabla!:MatPaginator;

constructor(
  private dialog:MatDialog,
  private _competenciaServicio:CompetenciaService,
  private _utilidadServicio:UtilidadService


){}

obtenerUsuarios(){

  this._competenciaServicio.consultaTodoCompetencia().subscribe({
    next: (data) => {
      if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
        this.dataListaCompetencia.data=data.result
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
    this.dataListaCompetencia.filterPredicate = (data: CompetenciaACompetencia, filter: string) => {
      return data.com_nombre.toLowerCase().includes(filter) || data.com_fecha.toLowerCase().includes(filter);
    };
    this.obtenerUsuarios();
    
  }
  ngAfterViewInit(): void {
    this.dataListaCompetencia.paginator=this.paginacionTabla;
  }

  aplicarFiltroTabla(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataListaUsarios.filter=filterValue.trim().toLocaleLowerCase();
    //this.buscarUsuarioPorNombre(filterValue);
  }

  aplicarFiltroTablaLocal(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaCompetencia.filter = filterValue.trim().toLowerCase();  // Aplicar el filtro a la tabla
  }
  

  nuevoUsuario(){
    this.dialog.open(ModalCompetenciaComponent,{
      disableClose:true
    }).afterClosed().subscribe(resultado=>{
      if(resultado ==="true")this.obtenerUsuarios();
    });
  }

  editarUsuario(competencia:CompetenciaACompetencia){
    this.dialog.open(ModalCompetenciaComponent,{
      disableClose:true,
      data:competencia
    }).afterClosed().subscribe(resultado=>{
      if(resultado ==="true")this.obtenerUsuarios();
    });
  }
  eliminarUsuario(competencia:CompetenciaACompetencia){
    Swal.fire({

      title:"¿Desea eliminar la competencia?",
      text:competencia.com_nombre,
      icon:"warning",
      confirmButtonColor:"#3085d6",
      confirmButtonText:"Si",
      showCancelButton:true,
      cancelButtonColor: "#d33",
      cancelButtonText:"No"


    }).then((resultado)=>{

      if(resultado.isConfirmed){
        this._competenciaServicio.eliminarCompetencia(competencia.com_id).subscribe({
          next:(data)=>{
            if(data.codigoError === -1){
              this._utilidadServicio.mostrarAlerta("La competencia fue eliminado","Listo!");
              this.obtenerUsuarios();
            }else{
              this._utilidadServicio.mostrarAlerta("NO se puedo eliminar la competencia","Error");
            }
          },
          error:(e)=>{
            this._utilidadServicio.mostrarAlerta("NO se puedo eliminar la competencia","Error Final");
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