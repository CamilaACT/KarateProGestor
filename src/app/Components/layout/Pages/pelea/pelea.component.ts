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
import { PeleaService } from '../../../../Services/pelea.service';
import { PeleaCTPelea } from '../../../../interfaces/pelea-ct-pelea';
import { CompetidorCTCompetidor } from '../../../../interfaces/competidor-ct-competidor';
import { ModalPeleaComponent } from '../../Modales/modal-pelea/modal-pelea.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pelea',
  templateUrl: './pelea.component.html',
  styleUrl: './pelea.component.css'
})
export class PeleaComponent implements OnInit,AfterViewInit {
columnasTable:string[]=["PeleaID","PeleaHora","CompetenciaNombre","Rival1Nombre","Rival1Color","Rival1Gano","Rival2Nombre","Rival2Color","Rival2Gano","acciones"];
dataInicio:PeleaCTPelea[]=[];
dataListaPelea=new MatTableDataSource(this.dataInicio);

@ViewChild(MatPaginator) paginacionTabla!:MatPaginator;

constructor(
  private dialog:MatDialog,
  private _peleaServicio:PeleaService,
  private _utilidadServicio:UtilidadService,
  private router: Router 

){}

obtenerUsuarios(){

  this._peleaServicio.consultaTodoRango().subscribe({
    next: (data) => {
      if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
        this.dataListaPelea.data=data.result
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
    this.dataListaPelea.filterPredicate = (data: PeleaCTPelea, filter: string) => {
      return data.com_nombre.toLowerCase().includes(filter) || data.rival1_nombre.toLowerCase().includes(filter) || data.rival2_nombre.toLowerCase().includes(filter)   ;
    };
    this.obtenerUsuarios();
    
  }
  ngAfterViewInit(): void {
    this.dataListaPelea.paginator=this.paginacionTabla;
  }

  aplicarFiltroTabla(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataListaUsarios.filter=filterValue.trim().toLocaleLowerCase();
    //this.buscarUsuarioPorNombre(filterValue);
  }

  aplicarFiltroTablaLocal(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaPelea.filter = filterValue.trim().toLowerCase();  // Aplicar el filtro a la tabla
  }
  

  nuevoUsuario(){
    this.dialog.open(ModalPeleaComponent,{
      disableClose:true
    }).afterClosed().subscribe(resultado=>{
      if(resultado ==="true")this.obtenerUsuarios();
    });
  }

  editarUsuario(pelea: PeleaCTPelea) {
    this.router.navigate(['/pages/puntuaciones'], { queryParams: { pel_id: pelea.pel_id } });
  }
  eliminarUsuario(pelea:PeleaCTPelea){
    Swal.fire({

      title:"¿Desea eliminar la pelea ?",
      text:pelea.pel_id.toString(),
      icon:"warning",
      confirmButtonColor:"#3085d6",
      confirmButtonText:"Si",
      showCancelButton:true,
      cancelButtonColor: "#d33",
      cancelButtonText:"No"


    }).then((resultado)=>{

      if(resultado.isConfirmed){
        this._peleaServicio.eliminarRango(pelea.pel_id).subscribe({
          next:(data)=>{
            if(data.codigoError === -1){
              this._utilidadServicio.mostrarAlerta("La pelea fue eliminado","Listo!");
              this.obtenerUsuarios();
            }else{
              this._utilidadServicio.mostrarAlerta("NO se puedo eliminar la pelea","Error");
            }
          },
          error:(e)=>{
            this._utilidadServicio.mostrarAlerta("NO se puedo eliminar la pelea","Error Final");
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

