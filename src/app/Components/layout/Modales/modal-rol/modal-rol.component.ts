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
  selector: 'app-modal-rol',
  templateUrl: './modal-rol.component.html',
  styleUrl: './modal-rol.component.css'
})
export class ModalRolComponent implements OnInit{

  formularioUsuario:FormGroup;
  ocultarPassword:boolean=true;
  tituloAccion:string="Agregar";
  botonAccion:string="Guardar";
  listaRoles:Rol[]=[];

  constructor(

    private modalActual:MatDialogRef<ModalRolComponent>,
    @Inject(MAT_DIALOG_DATA) public datosRol: Rol,
    private fb:FormBuilder,
    private _rolServicio:RolService,
    private _utilidadServicio:UtilidadService
  ){
    this.formularioUsuario = this.fb.group({
      nombre: ["", Validators.required],  // Corregido: Comillas bien colocadas
    });

    if(this.datosRol !=null){
      this.tituloAccion="Editar";
      this.botonAccion="Actualizar";
    }

    this._rolServicio.listaRoles(1).subscribe({
      next:(data)=>{
        if(data.codigoError===-1){
          this.listaRoles=data.result
        }
      },
      error:(e) =>{}
    })

  }
   ngOnInit(): void {
     if(this.datosRol!=null){
      this.formularioUsuario.patchValue({
        nombre: this.datosRol.rol_nombre  // Corregido: Comillas bien colocadas
      })
     }
   }

   guardarEditar_Usuario() {
    const _rol: Rol = {
      rol_id: this.datosRol == null ? 0 : this.datosRol.rol_id,
      rol_nombre: this.formularioUsuario.value.nombre
    };

    if (this.datosRol == null) {
      this._rolServicio.grabaRango(_rol).subscribe({
        next: (data) => {
          if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
            this._utilidadServicio.mostrarAlerta("El rol fue registrado", "Éxito");
            this.modalActual.close("true")
          }else{
            this._utilidadServicio.mostrarAlerta("Ocurrió un error al registrar el rol", "Error");
          }
        },
        error: (err) => {
          this._utilidadServicio.mostrarAlerta("Ocurrió un error al registrar el rol", "Error Final");
          console.error(err);  // Opcional, para depurar en caso de error
        }
      });
    }else{

      this._rolServicio.actualizaRango(_rol).subscribe({
        next: (data) => {
          if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
            this._utilidadServicio.mostrarAlerta("El rol fue editado", "Éxito");
            this.modalActual.close("true")
          }else{
            this._utilidadServicio.mostrarAlerta("Ocurrió un error al edital el rol", "Error");
          }
        },
        error: (err) => {
          this._utilidadServicio.mostrarAlerta("Ocurrió un error al edital el rol", "Error Final");
          console.error(err);  // Opcional, para depurar en caso de error
        }
      });



    }

    


  }
  
}

