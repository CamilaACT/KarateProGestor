import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from '../../../../interfaces/rol';
import { Usuario } from '../../../../interfaces/usuario';


import { RolService } from '../../../../Services/rol.service';
import { UsuarioService } from '../../../../Services/usuario.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { UsuarioAUsuario } from '../../../../interfaces/usuario-a-usuario';
import { RangoService } from '../../../../Services/rango.service';
import { RangoARango } from '../../../../interfaces/rango-a-rango';
import { CompetenciaACompetencia } from '../../../../interfaces/competencia-a-competencia';
import { CompetidorACompetidor } from '../../../../interfaces/competidor-a-competidor';
import { PeleaService } from '../../../../Services/pelea.service';
import { CompetenciaService } from '../../../../Services/competencia.service';
import { CompetidorService } from '../../../../Services/competidor.service';
import { PeleaCTPelea } from '../../../../interfaces/pelea-ct-pelea';
import { PeleaAPelea } from '../../../../interfaces/pelea-a-pelea';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYYMMDD HH:mm',  // Formato de entrada con fecha y hora
  },
  display: {
    dateInput: 'YYYYMMDD HH:mm',  // Formato de visualización con fecha y hora
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',          // Formato accesible para fecha completa
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-modal-pelea',
  templateUrl: './modal-pelea.component.html',
  styleUrl: './modal-pelea.component.css'
})
export class ModalPeleaComponent implements OnInit{

  formularioUsuario:FormGroup;
  ocultarPassword:boolean=true;
  tituloAccion:string="Agregar";
  botonAccion:string="Guardar";
  listaCompetencia:CompetenciaACompetencia[]=[];
  listaCompetidor:CompetidorACompetidor[]=[];
  

  constructor(

    private modalActual:MatDialogRef<ModalPeleaComponent>,
    @Inject(MAT_DIALOG_DATA) public datosPelea: PeleaCTPelea,
    private fb:FormBuilder,
    private _peleaServicio:PeleaService,
    private _competenciaServicio:CompetenciaService,
    private _competidorServicio:CompetidorService,
    private _utilidadServicio:UtilidadService,
  ){
    this.formularioUsuario = this.fb.group({
      fecha: ["", Validators.required],
      hora: ["", Validators.required],  // Corregido: Comillas bien colocadas
      competencia: ["", Validators.required],
      rival1: ["", Validators.required],
      rival2: ["", Validators.required],
      color1: ["", Validators.required],
      color2: ["", Validators.required],
    });

    if(this.datosPelea !=null){
      this.tituloAccion="Editar";
      this.botonAccion="Actualizar";
    }

    this._competenciaServicio.consultaTodoCompetencia().subscribe({
      next:(data)=>{
        if(data.codigoError===-1){
          this.listaCompetencia=data.result
        }
      },
      error:(e) =>{}
    })

    this._competidorServicio.consultaTodoRango().subscribe({
      next:(data)=>{
        if(data.codigoError===-1){
          this.listaCompetidor=data.result
        }
      },
      error:(e) =>{}
    })

  }
   ngOnInit(): void {
     if(this.datosPelea!=null){
      this.formularioUsuario.patchValue({
        fecha: this.datosPelea.pel_hora ? moment(this.datosPelea.pel_hora, 'YYYYMMDDHHmm').toDate() : '',
        hora: this.datosPelea.pel_hora ? moment(this.datosPelea.pel_hora, 'YYYYMMDDHHmm').format('HH:mm') : '',  // Corregido: Comillas bien colocadas
        competencia: this.datosPelea.com_id,
        rival1: this.datosPelea.rival1_cmp_id,
        rival2: this.datosPelea.rival2_cmp_id,
        color1: this.datosPelea.rival1_color_num,
        color2: this.datosPelea.rival2_color_num,
      })
     }
   }

   guardarEditar_Usuario() {

    const fecha = moment(this.formularioUsuario.value.fecha).format('YYYYMMDD');
    const hora = this.formularioUsuario.value.hora; // Ya en formato HH:mm
    const pel_hora = `${fecha} ${hora}`;  // Resultado en 'YYYYMMDD HH:mm'

    const _pelea: PeleaAPelea = {
      pel_id: this.datosPelea == null ? 0 : this.datosPelea.pel_id,
      pel_hora: pel_hora,
      com_id: this.formularioUsuario.value.competencia,
      cmp_id_1: this.formularioUsuario.value.rival1,
      cmp_id_2:this.formularioUsuario.value.rival2,
      riv_color1: this.formularioUsuario.value.color1,
      riv_color2: this.formularioUsuario.value.color2,
      tec_puntos: ''
    };

    if (this.datosPelea == null) {
      this._peleaServicio.grabaRango(_pelea).subscribe({
        next: (data) => {
          if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
            this._utilidadServicio.mostrarAlerta("La pelea fue registrado", "Éxito");
            this.modalActual.close("true")
          }else{
            this._utilidadServicio.mostrarAlerta("Ocurrió un error al registrar la pelea", "Error");
          }
        },
        error: (err) => {
          this._utilidadServicio.mostrarAlerta("Ocurrió un error al registrar la pelea", "Error Final");
          console.error(err);  // Opcional, para depurar en caso de error
        }
      });
    }else{

      this._peleaServicio.actualizaRango(_pelea).subscribe({
        next: (data) => {
          if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
            this._utilidadServicio.mostrarAlerta("La pelea fue editado", "Éxito");
            this.modalActual.close("true")
          }else{
            this._utilidadServicio.mostrarAlerta("Ocurrió un error al edital la pelea", "Error");
          }
        },
        error: (err) => {
          this._utilidadServicio.mostrarAlerta("Ocurrió un error al edital la pelea", "Error Final");
          console.error(err);  // Opcional, para depurar en caso de error
        }
      });



    }

    


  }
  
}


