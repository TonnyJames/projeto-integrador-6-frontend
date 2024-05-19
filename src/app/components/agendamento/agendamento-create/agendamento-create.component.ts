import { ClinicaService } from '../../../services/clinica.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Agendamento } from 'src/app/models/agendamento';
import { Paciente } from 'src/app/models/paciente';
import { Colaborador } from 'src/app/models/colaborador';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { Clinica } from 'src/app/models/clinica';

@Component({
  selector: 'app-agendamento-create',
  templateUrl: './agendamento-create.component.html',
  styleUrls: ['./agendamento-create.component.css']
})
export class AgendamentoCreateComponent implements OnInit {
  // colaboradores:  Colaborador[] = []

  idClinica:      String = ''
  idCliente:      String = ''
  cliente:        Paciente
  clinica:        Clinica
  agendamento:    Agendamento = {
    dataAgendada:'',
    horaAgendada:'',
    especialidade:'',
    // prioridade:  '',
    // status:      '',
    // titulo:      '',
    observacoes:   '',
    paciente:     '',
    // colaborador:     '',
    clinica: '',
    nomePaciente: '',
    nomeColaborador: '',
    nomeClinica: ''
  }


  especialidade: FormControl = new FormControl(null, [Validators.required])
  horaAgendada: FormControl = new FormControl(null, [Validators.required]);
  dataAgendada: FormControl = new FormControl(null, [Validators.required])
  // prioridade: FormControl = new FormControl(null, [Validators.required])
  // status:     FormControl = new FormControl(null, [Validators.required])
  // titulo:      FormControl = new FormControl(null, [Validators.required])
  // observacoes: FormControl = new FormControl(null, [Validators.required])
  // colaborador: FormControl = new FormControl(null, [Validators.required])
  // paciente:     FormControl = new FormControl(null, [Validators.required])
  // servicos:     FormControl = new FormControl(null, [Validators.required])


  constructor(
    private agendamentoService: AgendamentoService,
    private clienteService:     PacienteService,
    // private colaboradorService: ColaboradorService,
    private clinicaService:     ClinicaService,
    private toastService:       ToastrService,
    private router:             Router,
    private route:              ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idClinica = this.route.snapshot.paramMap.get('id');
    this.idCliente = localStorage.getItem("id")
    // this.findAllClientes();
    this.findClienteById();
    // this.findAllColaboradores();
    this.findClinicaById();
  }

  create(): void {
    let newDate: moment.Moment = moment.utc(this.agendamento.dataAgendada).local();
    this.agendamento.dataAgendada = newDate.format("YYYY-MM-DD")
    this.agendamentoService.create(this.agendamento).subscribe(resposta => {
      this.toastService.success('Agendamento cadastrado com sucesso', 'Novo Agendamento');
      this.router.navigate(['agendamentos']);
    }, ex =>{
      this.toastService.error(ex.error.error);
    })
  }

  // findAllClientes(): void {
  //   this.clienteService.findAll().subscribe(resposta => {
  //     this.clientes = resposta;
  //   })
  // }

  findClienteById(): void {
    this.clienteService.findById(this.idCliente).subscribe(resposta => {
      this.agendamento.paciente = resposta.id
      this.cliente = resposta
    })
  }

  // findAllColaboradores(): void {
  //   this.colaboradorService.findAll().subscribe(resposta => {
  //     this.colaboradores = resposta
  //   })
  // }

  findClinicaById() {
    this.clinicaService.findById(this.idClinica).subscribe(resposta => {
      this.agendamento.clinica = resposta.id
      this.clinica = resposta
    })
  }


  validaCampos(): boolean{
    return this.dataAgendada.valid
    //&& this.status.valid
    && this.horaAgendada.valid
    && this.especialidade.valid
    // && this.colaborador.valid
  }
}
