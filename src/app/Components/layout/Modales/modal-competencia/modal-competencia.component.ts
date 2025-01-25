import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from '../../../../interfaces/rol';




import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { RangoService } from '../../../../Services/rango.service';
import { RangoARango } from '../../../../interfaces/rango-a-rango';
import { ClubService } from '../../../../Services/club.service';
import { ClubAClub } from '../../../../interfaces/club-a-club';
import { CompetenciaService } from '../../../../Services/competencia.service';
import { CompetenciaACompetencia } from '../../../../interfaces/competencia-a-competencia';


import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';
export const MY_DATE_FORMATS={
  parse:{
    dateInput: 'YYYYMMDD'
  },
  display:{
    dateInput : 'YYYYMMDD',
    monthYearLabel:'MMMM YYYY'
  }
}


@Component({
  selector: 'app-modal-competencia',
  templateUrl: './modal-competencia.component.html',
  styleUrl: './modal-competencia.component.css',
// Agrega DatePipe como proveedor
})
export class ModalCompetenciaComponent implements OnInit{

  formularioUsuario:FormGroup;
  ocultarPassword:boolean=true;
  tituloAccion:string="Agregar";
  botonAccion:string="Guardar";


  constructor(

    private modalActual:MatDialogRef<ModalCompetenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public datosCompetencia: CompetenciaACompetencia,
    private fb:FormBuilder,
    private _competenciaServicio:CompetenciaService,
    private _utilidadServicio:UtilidadService,

  ){
    this.formularioUsuario = this.fb.group({
      nombre: ["", Validators.required],  // Corregido: Comillas bien colocadas
      fecha: ["", Validators.required],
      descripcion: ["", Validators.required]
    });

    if(this.datosCompetencia !=null){
      this.tituloAccion="Editar";
      this.botonAccion="Actualizar";
    }

  

  }
   ngOnInit(): void {
     if(this.datosCompetencia!=null){
      this.formularioUsuario.patchValue({
        nombre: this.datosCompetencia.com_nombre,  // Corregido: Comillas bien colocadas
        fecha: this.datosCompetencia.com_fecha,
        descripcion: this.datosCompetencia.com_descripcion
      })
     }
   }

   guardarEditar_Usuario() {
     // Formatea la fecha antes de enviarla
        const _competencia: CompetenciaACompetencia = {
      com_id: this.datosCompetencia == null ? 0 : this.datosCompetencia.com_id,
      com_nombre: this.formularioUsuario.value.nombre,
      com_fecha: moment(this.formularioUsuario.value.fecha).format('YYYYMMDD'),
      com_descripcion: this.formularioUsuario.value.descripcion
    };

    if (this.datosCompetencia == null) {
      this._competenciaServicio.grabaCompetencia(_competencia).subscribe({
        next: (data) => {
          if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
            this._utilidadServicio.mostrarAlerta("La competencia fue registrado", "Éxito");
            this.modalActual.close("true")
          }else{
            this._utilidadServicio.mostrarAlerta("Ocurrió un error al registrar la competencia", "Error");
          }
        },
        error: (err) => {
          this._utilidadServicio.mostrarAlerta("Ocurrió un error al registrar la competencia", "Error Final");
          console.error(err);  // Opcional, para depurar en caso de error
        }
      });
    }else{

      this._competenciaServicio.actualizaCompetencia(_competencia).subscribe({
        next: (data) => {
          if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
            this._utilidadServicio.mostrarAlerta("La competenciafue editado", "Éxito");
            this.modalActual.close("true")
          }else{
            this._utilidadServicio.mostrarAlerta("Ocurrió un error al edital la competencia", "Error");
          }
        },
        error: (err) => {
          this._utilidadServicio.mostrarAlerta("Ocurrió un error al edital la competencia", "Error Final");
          console.error(err);  // Opcional, para depurar en caso de error
        }
      });



    }

    


  }
  
}


