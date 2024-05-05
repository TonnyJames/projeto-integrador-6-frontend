import { Clinica } from '../../../models/clinica';
import { ClinicaService } from '../../../services/clinica.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-clinica-list',
  templateUrl: './clinica-list.component.html',
  styleUrls: ['./clinica-list.component.css']
})
export class ClinicaListComponent implements OnInit {
  ELEMENT_DATA: Clinica[] = []

  displayedColumns: string[] = ['nmNegocio','categoria', 'acoes'];
  dataSource = new MatTableDataSource<Clinica>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
      private route: ActivatedRoute,
    private clinicaService: ClinicaService
  ) { }

  ngOnInit(): void {
    this.pesquisar(this.route.snapshot.queryParams.categoriaSelecionada)
  }

  public pesquisar(numeroCategoria: number) {
    if (numeroCategoria) {
      this.clinicaService.findByCategoria(numeroCategoria).subscribe(clinicasLista => {
        this.ELEMENT_DATA = clinicasLista
        this.dataSource = new MatTableDataSource<Clinica>(clinicasLista);
      })
    } else {
      this.clinicaService.findAll().subscribe(clinicasLista => {
        this.ELEMENT_DATA = clinicasLista
        this.dataSource = new MatTableDataSource<Clinica>(clinicasLista);
      })
    }
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
