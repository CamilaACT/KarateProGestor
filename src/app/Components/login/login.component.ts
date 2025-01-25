import { Component, OnInit } from '@angular/core';

import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../interfaces/login';
import { UsuarioService } from '../../Services/usuario.service';
import { UtilidadService } from '../../Reutilizable/utilidad.service';
import { LoginService } from '../../Services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsuarioComponent } from '../layout/Modales/modal-usuario/modal-usuario.component';
import { ModalRegistrarseComponent } from '../layout/Modales/modal-registrarse/modal-registrarse.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formularioLogin:FormGroup;
  ocultarPassword:boolean=true;
  mostrarLoading:boolean=false;

  constructor(
    private dialog:MatDialog,
    private fb:FormBuilder,
    private router:Router,
    private _loginServicio:LoginService,
    private _utilidadServicio:UtilidadService
  ){

    this.formularioLogin=this.fb.group({
    email:["",Validators.required],
    password:["",Validators.required],

    });

  }

  ngOnInit(): void {
    
  }

  iniciarSesion(){
    this.mostrarLoading=true;
    const request:Login={
      correo: this.formularioLogin.value.email,
      clave:this.formularioLogin.value.password
    }

    this._loginServicio.IniciarSesion(request).subscribe({
      next:(data)=>{
        if(data.codigoError === -1){
          this._utilidadServicio.guardarSesionUsuario(data.message);
          this.router.navigate(["pages"])
        }else{
          this._utilidadServicio.mostrarAlerta(data.message,"Intentelo nuevamente")
        }
      },
      complete:()=>{
        this.mostrarLoading=false;
      },
      error:()=>{
        this._utilidadServicio.mostrarAlerta("Error inesperado","Intentelo nuevamente")
      }
    })
  }

  registrarUsuario(){
    this.dialog.open(ModalRegistrarseComponent,{
      disableClose:true
    }).afterClosed().subscribe(resultado=>{
      if(resultado ==="true")this._utilidadServicio.mostrarAlerta("Usuario creado correctamente","Exitó");
    });
  }


  
}
