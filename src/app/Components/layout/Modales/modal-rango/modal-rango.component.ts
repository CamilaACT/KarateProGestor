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

@Component({
  selector: 'app-modal-rango',
  templateUrl: './modal-rango.component.html',
  styleUrl: './modal-rango.component.css'
})
export class ModalRangoComponent implements OnInit{

  formularioUsuario:FormGroup;
  ocultarPassword:boolean=true;
  tituloAccion:string="Agregar";
  botonAccion:string="Guardar";
  listaRoles:Rol[]=[];

  constructor(

    private modalActual:MatDialogRef<ModalRangoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosRango: RangoARango,
    private fb:FormBuilder,
    private _rangoServicio:RangoService,
    private _utilidadServicio:UtilidadService
  ){
    this.formularioUsuario = this.fb.group({
      color: ["", Validators.required],  // Corregido: Comillas bien colocadas
      experto: ["", Validators.required]
    });

    if(this.datosRango !=null){
      this.tituloAccion="Editar";
      this.botonAccion="Actualizar";
    }

    this._rangoServicio.consultaTodoRango().subscribe({
      next:(data)=>{
        if(data.codigoError===-1){
          this.listaRoles=data.result
        }
      },
      error:(e) =>{}
    })

  }
   ngOnInit(): void {
     if(this.datosRango!=null){
      this.formularioUsuario.patchValue({
        color: this.datosRango.ran_color,  // Corregido: Comillas bien colocadas
        experto: ["", [Validators.required, Validators.pattern("^[0-9]*$")]]
      })
     }
   }

   guardarEditar_Usuario() {
    const _rango: RangoARango = {
      ran_id: this.datosRango == null ? 0 : this.datosRango.ran_id,
      ran_color: this.formularioUsuario.value.color,
      ran_experto: this.formularioUsuario.value.experto
    };

    if (this.datosRango == null) {
      this._rangoServicio.grabaRango(_rango).subscribe({
        next: (data) => {
          if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
            this._utilidadServicio.mostrarAlerta("El rango fue registrado", "Éxito");
            this.modalActual.close("true")
          }else{
            this._utilidadServicio.mostrarAlerta("Ocurrió un error al registrar el rango", "Error");
          }
        },
        error: (err) => {
          this._utilidadServicio.mostrarAlerta("Ocurrió un error al registrar el rango", "Error Final");
          console.error(err);  // Opcional, para depurar en caso de error
        }
      });
    }else{

      this._rangoServicio.actualizaRango(_rango).subscribe({
        next: (data) => {
          if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
            this._utilidadServicio.mostrarAlerta("El rango fue editado", "Éxito");
            this.modalActual.close("true")
          }else{
            this._utilidadServicio.mostrarAlerta("Ocurrió un error al edital el rango", "Error");
          }
        },
        error: (err) => {
          this._utilidadServicio.mostrarAlerta("Ocurrió un error al edital el rango", "Error Final");
          console.error(err);  // Opcional, para depurar en caso de error
        }
      });



    }

    


  }
  
}

