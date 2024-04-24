import { Clinica } from '../../../models/clinica';
import { ClinicaService } from '../../../services/clinica.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
    private clinicaService: ClinicaService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.clinicaService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Clinica>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
