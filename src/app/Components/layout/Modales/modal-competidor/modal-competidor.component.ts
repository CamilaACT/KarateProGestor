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
import { CompetidorACompetidor } from '../../../../interfaces/competidor-a-competidor';
import { CompetidorCTCompetidor } from '../../../../interfaces/competidor-ct-competidor';
import { getLocaleDateFormat } from '@angular/common';
import { CompetidorService } from '../../../../Services/competidor.service';
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
  selector: 'app-modal-competidor',
  templateUrl: './modal-competidor.component.html',
  styleUrl: './modal-competidor.component.css'
})
export class ModalCompetidorComponent implements OnInit{

  formularioUsuario:FormGroup;
  ocultarPassword:boolean=true;
  tituloAccion:string="Agregar";
  botonAccion:string="Guardar";
  listaClub:ClubAClub[]=[];
  listaRango:RangoARango[]=[];

  constructor(

    private modalActual:MatDialogRef<ModalCompetidorComponent>,
    @Inject(MAT_DIALOG_DATA) public datosCompetidor: CompetidorCTCompetidor,
    private fb:FormBuilder,
    private _competidorServicio:CompetidorService,
    private _utilidadServicio:UtilidadService,
    private _clubServicio:ClubService,
    private _rangoServicio:RangoService

  ){
    this.formularioUsuario = this.fb.group({
      nombre: ["", Validators.required],  // Corregido: Comillas bien colocadas
      fecha: ["", Validators.required],
      peso: ["", Validators.required],
      cedula: ["", Validators.required],
      rango: ["", Validators.required],
      club: ["", Validators.required],
    });

    if(this.datosCompetidor !=null){
      this.tituloAccion="Editar";
      this.botonAccion="Actualizar";
    }

    this._clubServicio.consultaTodoClub().subscribe({
      next:(data)=>{
        if(data.codigoError===-1){
          this.listaClub=data.result
        }
      },
      error:(e) =>{}
    })

    this._rangoServicio.consultaTodoRango().subscribe({
      next:(data)=>{
        if(data.codigoError===-1){
          this.listaRango=data.result
        }
      },
      error:(e) =>{}
    })

  

  }
   ngOnInit(): void {
     if(this.datosCompetidor!=null){
      this.formularioUsuario.patchValue({
        nombre: this.datosCompetidor.cmp_nombre,  // Corregido: Comillas bien colocadas
        peso: this.datosCompetidor.cmp_peso,
        cedula: this.datosCompetidor.cmp_cedula,


      })
     }
   }

   guardarEditar_Usuario() {
     // Formatea la fecha antes de enviarla
        const _competencia: CompetidorACompetidor = {
      cmp_id: this.datosCompetidor == null ? 0 : this.datosCompetidor.cmp_id,
      cmp_nombre: this.formularioUsuario.value.nombre,
      cmp_fech_naci: moment(this.formularioUsuario.value.fecha).format('YYYYMMDD'),
      cmp_cedula: this.formularioUsuario.value.cedula,
      cmp_peso : this.formularioUsuario.value.peso,
      ran_id: this.formularioUsuario.value.rango,
      clu_id: this.formularioUsuario.value.club,
    };

    if (this.datosCompetidor == null) {
      this._competidorServicio.grabaRango(_competencia).subscribe({
        next: (data) => {
          if (data.codigoError === 1) {  // Verificamos si data.status es verdadero
            this._utilidadServicio.mostrarAlerta("El competidor no puede ser registrado ya existía un competidor con ese número de cédula", "Error");
            this.modalActual.close("true")
          } else if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
            this._utilidadServicio.mostrarAlerta("El competidor fue registrado", "Éxito");
            this.modalActual.close("true")
          }
          else{
            this._utilidadServicio.mostrarAlerta("Ocurrió un error al registrar el competidor", "Error");
          }
        },
        error: (err) => {
          this._utilidadServicio.mostrarAlerta("Ocurrió un error al registrar el competidor", "Error Final");
          console.error(err);  // Opcional, para depurar en caso de error
        }
      });
    }else{

      this._competidorServicio.actualizaRango(_competencia).subscribe({
        next: (data) => {
          if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
            this._utilidadServicio.mostrarAlerta("El competidor fue editado", "Éxito");
            this.modalActual.close("true")
          }else{
            this._utilidadServicio.mostrarAlerta("Ocurrió un error al edital el competidor", "Error");
          }
        },
        error: (err) => {
          this._utilidadServicio.mostrarAlerta("Ocurrió un error al editar el competidor", "Error Final");
          console.error(err);  // Opcional, para depurar en caso de error
        }
      });



    }

    


  }
  
}


