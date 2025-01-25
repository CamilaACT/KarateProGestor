import { Injectable } from '@angular/core';


import { MatSnackBar } from '@angular/material/snack-bar';
import { Sesion } from '../interfaces/sesion';
@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor(private _snackBar:MatSnackBar) { }


  mostrarAlerta(mensaje:string, tipo:string){
    this._snackBar.open(mensaje,tipo,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    })
  }
  guardarSesionUsuario(message: string) {
    if (typeof window !== 'undefined') {
      const partes = message.split('|');
  
      const sesionUsuario: Sesion = {
        idUsuario: parseInt(partes[0]),     
        nombre: partes[1],                  
        correo: partes[2],                  
        rolDescripcion: partes[3],          
        token: partes[4]                    
      };
  
      localStorage.setItem("sesion", JSON.stringify(sesionUsuario));
    }
  }
  
  obtenerSesionUsuario() {
    if (typeof window !== 'undefined') {
      const dataCadena = localStorage.getItem("sesion");
      return dataCadena ? JSON.parse(dataCadena) : null;
    }
    return null;
  }
  
  eliminarSesionUsuario() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("sesion");
    }
  }
  

  obtenerRolUsuario(): string {
    const usuario = this.obtenerSesionUsuario();
    return usuario ? usuario.rolDescripcion : '';
  }
  


}
