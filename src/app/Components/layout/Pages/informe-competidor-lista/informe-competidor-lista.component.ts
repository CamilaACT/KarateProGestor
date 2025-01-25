import { Component, OnInit } from '@angular/core';
import { InformeService } from '../../../../Services/informe.service';

import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informe-competidor-lista',
  templateUrl: './informe-competidor-lista.component.html',
  styleUrls: ['./informe-competidor-lista.component.css']
})
export class InformeCompetidorListaComponent   {
 
  listaCompetencias: any[] = [];
  listaClubes: any[] = [];
  listaTecnicas: any[] = [];
  competenciaSeleccionada: number | null = null;
  clubSeleccionado: number | null = null;
  tecnicaSeleccionada: number | null = null;

  dataSourceInforme = new MatTableDataSource<any>();
  displayedColumns: string[] = ['competidor', 'club', 'tecnicaLider', 'medallas', 'totalPeleas', 'eficiencia'];

  constructor(private informeService: InformeService) {}

  ngOnInit(): void {
    this.obtenerCompetencias();
    this.obtenerClubes();
    this.obtenerTecnicas();
  }

  obtenerCompetencias(): void {
    this.informeService.consultaCompetencias().subscribe({
      next: (data) => {
        if (data.codigoError === -1) {
          this.listaCompetencias = data.result;
        } else {
          Swal.fire('Error', data.message, 'error');
        }
      },
      error: (error) => {
        console.error('Error al obtener competencias:', error);
        Swal.fire('Error', 'No se pudieron cargar las competencias.', 'error');
      }
    });
  }

  obtenerClubes(): void {
    this.informeService.consultaClubes().subscribe({
      next: (data) => {
        if (data.codigoError === -1) {
          this.listaClubes = data.result;
        } else {
          Swal.fire('Error', data.message, 'error');
        }
      },
      error: (error) => {
        console.error('Error al obtener clubes:', error);
        Swal.fire('Error', 'No se pudieron cargar los clubes.', 'error');
      }
    });
  }

  obtenerTecnicas(): void {
    this.informeService.consultaTecnicas().subscribe({
      next: (data) => {
        if (data.codigoError === -1) {
          this.listaTecnicas = data.result;
        } else {
          Swal.fire('Error', data.message, 'error');
        }
      },
      error: (error) => {
        console.error('Error al obtener técnicas:', error);
        Swal.fire('Error', 'No se pudieron cargar las técnicas.', 'error');
      }
    });
  }

  obtenerInforme(): void {
    const request = {
      com_id: this.competenciaSeleccionada ?? -1,
      clu_id: this.clubSeleccionado ?? -1,
      tec_id: this.tecnicaSeleccionada ?? -1
    };

    this.informeService.competidorPorClubCompeTecForeach(request).subscribe({
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

