import { Clinica } from 'src/app/models/clinica';
import { ClinicaService } from '../../../services/clinica.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Agendamento } from 'src/app/models/agendamento';
import { Paciente } from 'src/app/models/paciente';
import { Colaborador } from 'src/app/models/colaborador';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { ColaboradorService } from 'src/app/services/colaborador.service';

@Component({
  selector: 'app-agendamento-update',
  templateUrl: './agendamento-update.component.html',
  styleUrls: ['./agendamento-update.component.css']
})
export class AgendamentoUpdateComponent implements OnInit {
  idClinica:      String = ''
  clinica:        Clinica
  clientes: Paciente[] = []
  colaboradores: Colaborador[] = []
  agendamento: Agendamento = {
    especialidade:'',
    // titulo:      '',
    dataAgendada: '',
    horaAgendada:'',
    // prioridade:  '',
    // status:      '',
    observacoes:   '',
    paciente:     '',
    // colaborador:     '',
    clinica: '',
    nomePaciente: '',
    nomeColaborador: '',
    nomeClinica: ''
  }

  especialidade:     FormControl = new FormControl(null, [Validators.required])
  dataAgendada: FormControl = new FormControl(null, [Validators.required])
  horaAgendada: FormControl = new FormControl(null, [Validators.required])
  // observacoes:  FormControl = new FormControl(null, [Validators.required])
  // colaborador:    FormControl = new FormControl(null, [Validators.required])
  // paciente:    FormControl = new FormControl(null, [Validators.required])
  // clinica: FormControl = new FormControl(null, [Validators.required])


  constructor(
    private agendamentoService: AgendamentoService,
    private clienteService: PacienteService,
    private colaboradorService: ColaboradorService,
    private clinicaService: ClinicaService,
    private toastService:   ToastrService,
    private route:          ActivatedRoute,
    private router:         Router
  ) { }

  ngOnInit(): void {
    this.agendamento.id = this.route.snapshot.paramMap.get('id');
    this.findAgendamentoById();
    // this.findAllServicos();
    // this.findAllClientes();
    // this.findAllColaboradors();
  }

  findAgendamentoById(): void{
    this.agendamentoService.findById(this.agendamento.id).subscribe(resposta => {
      this.agendamento = resposta;
      this.idClinica = resposta.clinica
      this.findClinicaById()
    }, ex => {
      this.toastService.error(ex.console.error.error);
    })
  }

  update(): void {
    let newDate: moment.Moment = moment.utc(this.agendamento.dataAgendada).local();
    this.agendamento.dataAgendada = newDate.format("YYYY-MM-DD")
    this.agendamentoService.update(this.agendamento).subscribe(resposta => {
      this.toastService.success('Agendamento atualizado com sucesso', 'Agendamento Update');
      this.router.navigate(['agendamentos']);
    }, ex =>{
      this.toastService.error(ex.error.error);
    })
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  findAllColaboradors(): void {
    this.colaboradorService.findAll().subscribe(resposta => {
      this.colaboradores = resposta
    })
  }

  findAllServicos() {
    this.clinicaService.findAll().subscribe(resposta => {
      // this.clinica = resposta
    })
  }

  findClinicaById() {
    this.clinicaService.findById(this.idClinica).subscribe(resposta => {
      this.clinica = resposta
    })
  }

  validaCampos(): boolean{
    return this.dataAgendada.valid
    && this.horaAgendada.valid
    && this.especialidade.valid
    // && this.observacoes.valid
    // && this.paciente.valid
    // && this.clinica.valid
  }

  retornaHorario(horario: any): string {
    if (horario == '1') {
return '09:00 às 10:00'
} else if (horario == 2) {
return '10:00 às 11:00'
} else if (horario == 3) {
return '11:00 às 12:00'
} else if (horario == 4) {
return '13:00 às 14:00'
} else if (horario == 5) {
return '14:00 às 15:00'
} else  {
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

}
