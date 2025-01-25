import { Component, OnInit } from '@angular/core';
import { InformeService } from '../../../../Services/informe.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informe-club',
  templateUrl: './informe-club.component.html',
  styleUrls: ['./informe-club.component.css']
})
export class InformeClubComponent implements OnInit {
  listaCompetencias: any[] = [];
  competenciaSeleccionada: number | null = null;
  dataSourceInforme = new MatTableDataSource<any>();
  displayedColumns: string[] = ['Club', 'Competidores', 'Medallas', 'Tecnica', 'Eficiencia'];

  constructor(private informeService: InformeService) {}

  ngOnInit(): void {
    this.obtenerCompetencias();
  }

  obtenerCompetencias(): void {
    this.informeService.consultaCompetencias().subscribe({
      next: (data) => {
        if (data.codigoError === -1) {
          this.listaCompetencias = data.result;
        } else {
          Swal.fire('Error', 'No se pudieron cargar las competencias.', 'error');
        }
      },
      error: (error) => {
        console.error('Error al obtener competencias:', error);
        Swal.fire('Error', 'Ocurrió un problema al cargar las competencias.', 'error');
      }
    });
  }

  obtenerInforme(): void {
    if (!this.competenciaSeleccionada) return;

    const request = { com_id: this.competenciaSeleccionada };

    this.informeService.clubPorCompetencia(request).subscribe({
      next: (data) => {
        if (data.codigoError === -1) {
          this.dataSourceInforme.data = data.result;
        } else {
          Swal.fire('Error', data.message, 'error');
        }
      },
      error: (error) => {
        console.error('Error al obtener el informe:', error);
        Swal.fire('Error', 'No se pudo cargar el informe.', 'error');
      }
    });
  }
}
