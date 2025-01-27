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
import { TecnicaATecnica } from '../../../../interfaces/tecnica-a-tecnica';
import { TecnicaService } from '../../../../Services/tecnica.service';
import { ModalTecnicaComponent } from '../../Modales/modal-tecnica/modal-tecnica.component';

@Component({
  selector: 'app-tecnica',
  templateUrl: './tecnica.component.html',
  styleUrl: './tecnica.component.css'
})
export class TecnicaComponent implements OnInit,AfterViewInit {
  columnasTable:string[]=["NombreTecnica","PuntosTecnica","acciones"];
dataInicio:TecnicaATecnica[]=[];
dataListaTecnicas=new MatTableDataSource(this.dataInicio);

@ViewChild(MatPaginator) paginacionTabla!:MatPaginator;

constructor(
  private dialog:MatDialog,
  private _tecnicaServicio:TecnicaService,
  private _utilidadServicio:UtilidadService


){}

obtenerUsuarios(){

  this._tecnicaServicio.consultaTodoTecnica().subscribe({
    next: (data) => {
      if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
        this.dataListaTecnicas.data=data.result
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
    this.dataListaTecnicas.filterPredicate = (data: TecnicaATecnica, filter: string) => {
      return data.tec_nombre.toLowerCase().includes(filter) ;
    };
    this.obtenerUsuarios();
    
  }
  ngAfterViewInit(): void {
    this.dataListaTecnicas.paginator=this.paginacionTabla;
  }

  aplicarFiltroTabla(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataListaUsarios.filter=filterValue.trim().toLocaleLowerCase();
    //this.buscarUsuarioPorNombre(filterValue);
  }

  aplicarFiltroTablaLocal(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaTecnicas.filter = filterValue.trim().toLowerCase();  // Aplicar el filtro a la tabla
  }
  

  nuevoUsuario(){
    this.dialog.open(ModalTecnicaComponent,{
      disableClose:true
    }).afterClosed().subscribe(resultado=>{
      if(resultado ==="true")this.obtenerUsuarios();
    });
  }

  editarUsuario(tecnica:TecnicaATecnica){
    this.dialog.open(ModalTecnicaComponent,{
      disableClose:true,
      data:tecnica
    }).afterClosed().subscribe(resultado=>{
      if(resultado ==="true")this.obtenerUsuarios();
    });
  }
  eliminarUsuario(tecnica:TecnicaATecnica){
    Swal.fire({

      title:"¿Desea eliminar la técnica?",
      text:tecnica.tec_nombre,
      icon:"warning",
      confirmButtonColor:"#3085d6",
      confirmButtonText:"Si",
      showCancelButton:true,
      cancelButtonColor: "#d33",
      cancelButtonText:"No"


    }).then((resultado)=>{

      if(resultado.isConfirmed){
        this._tecnicaServicio.eliminarTecnica(tecnica.tec_id).subscribe({
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

