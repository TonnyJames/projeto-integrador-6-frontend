import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Agendamento } from 'src/app/models/agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';

@Component({
  selector: 'app-agendamento-list',
  templateUrl: './agendamento-list.component.html',
  styleUrls: ['./agendamento-list.component.css']
})
export class AgendamentoListComponent implements OnInit {

  ELEMENT_DATA: Agendamento[] = []
  FILTERED_DATA: Agendamento[] = []

  displayedColumns: string[] = ['especialidade', 'dataAgendada', 'horaAgendada', 'acoes'];
  dataSource = new MatTableDataSource<Agendamento>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private agendamentoService: AgendamentoService,
    private clienteService: PacienteService
  ) { }

  ngOnInit(): void {
    this.findByCliente();
  }

  findAll(): void {
    this.agendamentoService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Agendamento>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  findByCliente(): void {
    this.clienteService.findById(localStorage.getItem("id")).subscribe(retorno => {
      this.agendamentoService.findByCpf(retorno.cpf).subscribe(resposta => {
        this.ELEMENT_DATA = resposta;
        this.dataSource = new MatTableDataSource<Agendamento>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      })
    })
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  retornaHorario(horario: any): string {
    if (horario == 1) {
      return '09:00 às 10:00'
    } else if (horario == 2) {
      return '10:00 às 11:00'
    } else if (horario == 3) {
      return '11:00 às 12:00'
    } else if (horario == 4) {
      return '13:00 às 14:00'
    } else if (horario == 5) {
      return '14:00 às 15:00'
    } else {
      return '15:00 às 16:00'
    }
  }

  // retornaStatus(status: any): string {
  //   if (status == '0') {
  //     return 'Aberto'
  //   } else if (status == 1) {
  //     return 'Em andamento'
  //   } else {
  //     return 'Encerrado'
  //   }
  // } 

  // retornaPrioridade(prioridade: any): string {
  //   if (prioridade == '0') {
  //     return 'Normal'
  //   } else {
  //     return 'Alta'
  //   }
  // }

  // orderByStatus(status: any): void{
  //   let list: Agendamento[] = []
  //   this.ELEMENT_DATA.forEach(element =>{
  //     if(element.status == status)
  //     list.push(element)
  //   });
  //   this.FILTERED_DATA = list;
  //   this.dataSource = new MatTableDataSource<Agendamento>(list);
  //   this.dataSource.paginator = this.paginator;
  // }

}
