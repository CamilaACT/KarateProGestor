import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from '../../../../interfaces/rol';
import { Usuario } from '../../../../interfaces/usuario';


import { RolService } from '../../../../Services/rol.service';
import { UsuarioService } from '../../../../Services/usuario.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { UsuarioAUsuario } from '../../../../interfaces/usuario-a-usuario';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.css'
})
export class ModalUsuarioComponent implements OnInit{

  formularioUsuario:FormGroup;
  ocultarPassword:boolean=true;
  tituloAccion:string="Agregar";
  botonAccion:string="Guardar";
  listaRoles:Rol[]=[];

  constructor(

    private modalActual:MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: UsuarioAUsuario,
    private fb:FormBuilder,
    private _rolServicio:RolService,
    private _usuarioServicio:UsuarioService,
    private _utilidadServicio:UtilidadService
  ){
    this.formularioUsuario = this.fb.group({
      nombre: ["", Validators.required],  // Corregido: Comillas bien colocadas
      correo: ["", Validators.required], 
      idRol: ["", Validators.required], 
      clave: ["", Validators.required], 
      cedula: ["", Validators.required], 
      rolDescripcion: ["", Validators.required]
    });

    if(this.datosUsuario !=null){
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
     if(this.datosUsuario!=null){
      this.formularioUsuario.patchValue({
        nombre: this.datosUsuario.usu_nombre,  // Corregido: Comillas bien colocadas
        correo: this.datosUsuario.usu_correo, 
        idRol: this.datosUsuario.rol_id, 
        clave: this.datosUsuario.usu_clave, 
        cedula: this.datosUsuario.usu_cedula,
        rolDescripcion: this.datosUsuario.rol_descripcion
      })
     }
   }

   guardarEditar_Usuario() {
    const _usuario: UsuarioAUsuario = {
      usu_id: this.datosUsuario == null ? 0 : this.datosUsuario.usu_id,
      usu_nombre: this.formularioUsuario.value.nombre,
      usu_correo: this.formularioUsuario.value.correo,
      rol_id: this.formularioUsuario.value.idRol,
      rol_descripcion: this.formularioUsuario.value.rolDescripcion, 
      usu_clave: this.formularioUsuario.value.clave,
      usu_cedula: this.formularioUsuario.value.cedula  // Asegúrate de que esActivo sea convertible a número
    };

    if (this.datosUsuario == null) {
      this._usuarioServicio.guardarUsuario(_usuario).subscribe({
        next: (data) => {
          if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
            this._utilidadServicio.mostrarAlerta("El usuario fue registrado", "Éxito");
            this.modalActual.close("true")
          }else{
            this._utilidadServicio.mostrarAlerta("Ocurrió un error al registrar el usuario", "Error");
          }
        },
        error: (err) => {
          this._utilidadServicio.mostrarAlerta("Ocurrió un error al registrar el usuario", "Error Final");
          console.error(err);  // Opcional, para depurar en caso de error
        }
      });
    }else{

      this._usuarioServicio.editarUsuario(_usuario).subscribe({
        next: (data) => {
          if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
            this._utilidadServicio.mostrarAlerta("El usuario fue editado", "Éxito");
            this.modalActual.close("true")
          }else{
            this._utilidadServicio.mostrarAlerta("Ocurrió un error al edital el usuario", "Error");
          }
        },
        error: (err) => {
          this._utilidadServicio.mostrarAlerta("Ocurrió un error al edital el usuario", "Error Final");
          console.error(err);  // Opcional, para depurar en caso de error
        }
      });



    }

    


  }
  
}
