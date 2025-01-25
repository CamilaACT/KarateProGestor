
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeleaService } from '../../../../Services/pelea.service';
import { PeleaCTPelea } from '../../../../interfaces/pelea-ct-pelea';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PuntuacionService } from '../../../../Services/puntuacion.service';
import { TecnicaService } from '../../../../Services/tecnica.service';
import { TecnicaATecnica } from '../../../../interfaces/tecnica-a-tecnica';
import { PuntuacionAPuntuacion } from '../../../../interfaces/puntuacion-a-puntuacion';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-puntuacion',
  templateUrl: './puntuacion.component.html',
  styleUrl: './puntuacion.component.css'
})
export class PuntuacionComponent implements OnInit {
  peleaId: number | null = null;
  rival1: any = {};
  rival2: any = {};
  listaTecnicas: TecnicaATecnica[] = [];
  formularioPuntaje: FormGroup;
  displayedColumns: string[] = ['cmp_nombre', 'rival_color', 'tec_nombre', 'tec_puntos', 'acciones'];
  dataSourcePuntajes = new MatTableDataSource<any>();


  constructor(
    private route: ActivatedRoute,
    private peleaService: PeleaService,
    private puntajeService: PuntuacionService,
    private tecnicaService: TecnicaService,
    private fb: FormBuilder,
    private router: Router 
  ) {
    this.formularioPuntaje = this.fb.group({
      riv_id: ['', Validators.required],
      tec_id: ['', Validators.required],
      pun_min: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.peleaId = +params['pel_id'] == null ? 0 : +params['pel_id'];
      if (this.peleaId > 0) {  // Asegúrate de que `peleaId` es mayor que 0
        this.obtenerRivales(this.peleaId);
        this.obtenerTecnicas();
        this.obtenerPuntajes();
      }
    });
  }

  obtenerRivales(peleaId: number): void {
    this.peleaService.consultaRivalesId(peleaId).subscribe({
      next: (data) => {
        if (data.codigoError === -1 && data.result.length === 2) {
          // Asignar los datos de los rivales
          this.rival1 = data.result[0];
          this.rival2 = data.result[1];
        }
      },
      error: (error) => {
        console.error('Error al obtener los rivales:', error);
      }
    });
  }

  obtenerTecnicas(): void {
    this.tecnicaService.consultaTodoTecnica().subscribe({
      next: (data) => {
        this.listaTecnicas = data.result;
      },
      error: (error) => console.error('Error al obtener técnicas:', error)
    });
  }

  obtenerPuntajes(): void {
    if (this.peleaId !== null) {
      this.puntajeService.consultaPuntuacionId(this.peleaId).subscribe({
        next: (data) => {
          this.dataSourcePuntajes.data = data.result; // Asigna los datos directamente al dataSource
        },
        error: (error) => console.error('Error al obtener puntajes:', error)
      });
    }
  }

  registrarPuntaje(): void {
    if (this.formularioPuntaje.invalid) return;

    const _puntaje: PuntuacionAPuntuacion = {
      pun_min: this.formularioPuntaje.value.pun_min,
      riv_id: this.formularioPuntaje.value.riv_id,
      tec_id: this.formularioPuntaje.value.tec_id
    };

    this.puntajeService.grabaPuntuacion(_puntaje).subscribe({
      next: (data) => {
        if (data.codigoError === -1) {
          this.obtenerPuntajes(); // Actualiza la lista de puntajes
          this.formularioPuntaje.reset(); // Limpia el formulario
        }
      },
      error: (error) => console.error('Error al registrar el puntaje:', error)
    });
  }
  eliminarPuntaje(pun_id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.puntajeService.eliminarPuntuacion(pun_id).subscribe({
          next: (data) => {
            if (data.codigoError === -1) {
              Swal.fire('¡Eliminado!', data.message, 'success');
              this.obtenerPuntajes(); // Actualiza la lista después de la eliminación
            } else {
              Swal.fire('Error', data.message, 'error');
            }
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo eliminar el puntaje', 'error');
            console.error('Error al eliminar el puntaje:', error);
          }
        });
      }
    });
  }

  volverALaLista() {
    this.router.navigate(['/pages/peleas']); // Redirige a la lista de peleas
  }

  finalizarPelea(): void {
    if (!this.peleaId) {
      Swal.fire('Error', 'No se pudo identificar la pelea actual.', 'error');
      return;
    }
  
    const request = { pel_id: this.peleaId };
  
    this.peleaService.grabaGanador(request).subscribe({
      next: (response) => {
        if (response.codigoError === -1) {
          Swal.fire('¡Éxito!', 'La pelea ha sido finalizada correctamente.', 'success');
          this.router.navigate(['/pages/peleas']); // Redirigir a la lista de peleas
        } else {
          Swal.fire('Error', response.message, 'error');
        }
      },
      error: (error) => {
        Swal.fire('Error', 'Hubo un problema al finalizar la pelea.', 'error');
        console.error('Error al finalizar pelea:', error);
      }
    });
  }
}