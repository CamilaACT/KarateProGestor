import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsuarioComponent } from '../../Modales/modal-usuario/modal-usuario.component';
import { Usuario } from '../../../../interfaces/usuario';
import { UsuarioService } from '../../../../Services/usuario.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import Swal from 'sweetalert2'
import { UsurioId } from '../../../../interfaces/usuario-id';
import { UsurioNombre } from '../../../../interfaces/usuario-nombre';
import { UsuarioAUsuario } from '../../../../interfaces/usuario-a-usuario';
import { CompetidorCTCompetidor } from '../../../../interfaces/competidor-ct-competidor';
import { CompetidorService } from '../../../../Services/competidor.service';
import { CompetidorACompetidor } from '../../../../interfaces/competidor-a-competidor';
import { ModalCompetidorComponent } from '../../Modales/modal-competidor/modal-competidor.component';

@Component({
  selector: 'app-competidor',
  templateUrl: './competidor.component.html',
  styleUrl: './competidor.component.css'
})
export class CompetidorComponent implements OnInit,AfterViewInit {
  columnasTable:string[]=["nombre","peso","cedula","color","experto","nombreclub","nombreResponsable","edad","acciones"];
  dataInicio:CompetidorCTCompetidor[]=[];
  dataListaCompetidores=new MatTableDataSource(this.dataInicio);
  
  @ViewChild(MatPaginator) paginacionTabla!:MatPaginator;
  
  constructor(
    private dialog:MatDialog,
    private _competidorServicio:CompetidorService,
    private _utilidadServicio:UtilidadService
  
  
  ){}
  
  obtenerUsuarios(){
  
    this._competidorServicio.consultaTodoRango().subscribe({
      next: (data) => {
        if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
          this.dataListaCompetidores.data=data.result
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
      this.dataListaCompetidores.filterPredicate = (data: CompetidorCTCompetidor, filter: string) => {
        return data.cmp_nombre.toLowerCase().includes(filter) || data.cmp_cedula.toLowerCase().includes(filter);
      };
      this.obtenerUsuarios();
      
    }
    ngAfterViewInit(): void {
      this.dataListaCompetidores.paginator=this.paginacionTabla;
    }
  
    aplicarFiltroTabla(event:Event){
      const filterValue = (event.target as HTMLInputElement).value;
      //this.dataListaUsarios.filter=filterValue.trim().toLocaleLowerCase();
      //this.buscarUsuarioPorNombre(filterValue);
    }
  
    aplicarFiltroTablaLocal(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataListaCompetidores.filter = filterValue.trim().toLowerCase();  // Aplicar el filtro a la tabla
    }
    
  
    nuevoUsuario(){
      this.dialog.open(ModalCompetidorComponent,{
        disableClose:true
      }).afterClosed().subscribe(resultado=>{
        if(resultado ==="true")this.obtenerUsuarios();
      });
    }
  
    editarUsuario(competidor:CompetidorCTCompetidor){
      this.dialog.open(ModalCompetidorComponent,{
        disableClose:true,
        data:competidor
      }).afterClosed().subscribe(resultado=>{
        if(resultado ==="true")this.obtenerUsuarios();
      });
    }
    eliminarUsuario(competidor:CompetidorCTCompetidor){
      Swal.fire({
  
        title:"¿Desea eliminar el usuario?",
        text:competidor.cmp_nombre,
        icon:"warning",
        confirmButtonColor:"#3085d6",
        confirmButtonText:"Si",
        showCancelButton:true,
        cancelButtonColor: "#d33",
        cancelButtonText:"No"
  
  
      }).then((resultado)=>{
  
        if(resultado.isConfirmed){
          this._competidorServicio.eliminarRango(competidor.cmp_id).subscribe({
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
  
