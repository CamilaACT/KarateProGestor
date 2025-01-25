import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from '../../../../interfaces/rol';




import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { RangoService } from '../../../../Services/rango.service';
import { RangoARango } from '../../../../interfaces/rango-a-rango';
import { ClubService } from '../../../../Services/club.service';
import { ClubAClub } from '../../../../interfaces/club-a-club';

@Component({
  selector: 'app-modal-club',
  templateUrl: './modal-club.component.html',
  styleUrl: './modal-club.component.css'
})
export class ModalClubComponent implements OnInit{

  formularioUsuario:FormGroup;
  ocultarPassword:boolean=true;
  tituloAccion:string="Agregar";
  botonAccion:string="Guardar";


  constructor(

    private modalActual:MatDialogRef<ModalClubComponent>,
    @Inject(MAT_DIALOG_DATA) public datosClub: ClubAClub,
    private fb:FormBuilder,
    private _clubServicio:ClubService,
    private _utilidadServicio:UtilidadService
  ){
    this.formularioUsuario = this.fb.group({
      nombre: ["", Validators.required],  // Corregido: Comillas bien colocadas
      nombreResponsable: ["", Validators.required]
    });

    if(this.datosClub !=null){
      this.tituloAccion="Editar";
      this.botonAccion="Actualizar";
    }

  

  }
   ngOnInit(): void {
     if(this.datosClub!=null){
      this.formularioUsuario.patchValue({
        nombre: this.datosClub.clu_nombre,  // Corregido: Comillas bien colocadas
        nombreResponsable: this.datosClub.clu_nom_resp
      })
     }
   }

   guardarEditar_Usuario() {
    const _club: ClubAClub = {
      clu_id: this.datosClub == null ? 0 : this.datosClub.clu_id,
      clu_nombre: this.formularioUsuario.value.nombre,
      clu_nom_resp: this.formularioUsuario.value.nombreResponsable
    };

    if (this.datosClub == null) {
      this._clubServicio.grabaClub(_club).subscribe({
        next: (data) => {
          if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
            this._utilidadServicio.mostrarAlerta("El club fue registrado", "Éxito");
            this.modalActual.close("true")
          }else{
            this._utilidadServicio.mostrarAlerta("Ocurrió un error al registrar el club", "Error");
          }
        },
        error: (err) => {
          this._utilidadServicio.mostrarAlerta("Ocurrió un error al registrar el club", "Error Final");
          console.error(err);  // Opcional, para depurar en caso de error
        }
      });
    }else{

      this._clubServicio.actualizaClub(_club).subscribe({
        next: (data) => {
          if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
            this._utilidadServicio.mostrarAlerta("El club fue editado", "Éxito");
            this.modalActual.close("true")
          }else{
            this._utilidadServicio.mostrarAlerta("Ocurrió un error al edital el club", "Error");
          }
        },
        error: (err) => {
          this._utilidadServicio.mostrarAlerta("Ocurrió un error al edital el club", "Error Final");
          console.error(err);  // Opcional, para depurar en caso de error
        }
      });



    }

    


  }
  
}


