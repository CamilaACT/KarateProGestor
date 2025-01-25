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
import { TecnicaATecnica } from '../../../../interfaces/tecnica-a-tecnica';
import { TecnicaService } from '../../../../Services/tecnica.service';

@Component({
  selector: 'app-modal-tecnica',
  templateUrl: './modal-tecnica.component.html',
  styleUrl: './modal-tecnica.component.css'
})
export class ModalTecnicaComponent implements OnInit{

  formularioUsuario:FormGroup;
  ocultarPassword:boolean=true;
  tituloAccion:string="Agregar";
  botonAccion:string="Guardar";
  listaRoles:Rol[]=[];

  constructor(

    private modalActual:MatDialogRef<ModalTecnicaComponent>,
    @Inject(MAT_DIALOG_DATA) public datosTecnica: TecnicaATecnica,
    private fb:FormBuilder,
    private _tecnicaServicio:TecnicaService,
    private _utilidadServicio:UtilidadService
  ){
    this.formularioUsuario = this.fb.group({
      nombre: ["", Validators.required],  // Corregido: Comillas bien colocadas
      puntos: ["", Validators.required]
    });

    if(this.datosTecnica !=null){
      this.tituloAccion="Editar";
      this.botonAccion="Actualizar";
    }

    this._tecnicaServicio.consultaTodoTecnica().subscribe({
      next:(data)=>{
        if(data.codigoError===-1){
          this.listaRoles=data.result
        }
      },
      error:(e) =>{}
    })

  }
   ngOnInit(): void {
     if(this.datosTecnica!=null){
      this.formularioUsuario.patchValue({
        nombre: this.datosTecnica.tec_nombre,  // Corregido: Comillas bien colocadas
        puntos: ["", [Validators.required, Validators.pattern("^[0-9]*$")]]
      })
     }
   }

   guardarEditar_Usuario() {
    const _tecnica: TecnicaATecnica = {
      tec_id: this.datosTecnica == null ? 0 : this.datosTecnica.tec_id,
      tec_nombre: this.formularioUsuario.value.nombre,
      tec_puntos: this.formularioUsuario.value.puntos
    };

    if (this.datosTecnica == null) {
      this._tecnicaServicio.grabaTecnica(_tecnica).subscribe({
        next: (data) => {
          if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
            this._utilidadServicio.mostrarAlerta("La técnica fue registrado", "Éxito");
            this.modalActual.close("true")
          }else{
            this._utilidadServicio.mostrarAlerta("Ocurrió un error al registrar la técnica", "Error");
          }
        },
        error: (err) => {
          this._utilidadServicio.mostrarAlerta("Ocurrió un error al registrar la técnica", "Error Final");
          console.error(err);  // Opcional, para depurar en caso de error
        }
      });
    }else{

      this._tecnicaServicio.actualizaTecnica(_tecnica).subscribe({
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

