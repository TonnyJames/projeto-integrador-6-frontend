import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from '../../../services/paciente.service';
import { ClinicaService } from '../../../services/clinica.service';
import { Clinica } from '../../../models/clinica';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clinica-create',
  templateUrl: './clinica-create.component.html',
  styleUrls: ['./clinica-create.component.css']
})
export class ClinicaCreateComponent implements OnInit {

  paciente: Paciente;

  clinica: Clinica = {
    id: '',
    categorias: null,
    nmNegocio: '',
    nrInsc: '', //cpf ou cnpj
    telefone: '',
    email: '',
    dataCriacao: '',
    admin: '',
    nomeAdmin: ''
  }

  categoria: FormControl = new FormControl(null, Validators.required);
  nmNegocio: FormControl = new FormControl(null, Validators.minLength(3));
  nrInsc: FormControl = new FormControl(null, Validators.required);
  telefone: FormControl = new FormControl(null, Validators.minLength(11));
  email: FormControl = new FormControl(null, Validators.email);
  admin: FormControl = new FormControl(null, Validators.required)

  constructor(
    private clienteService: PacienteService,
    private clinicaService: ClinicaService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAdmin()
    // console.log()
    console.log("parametro recebido em admin é: " + this.clinica.admin)
  }

  create(): void {
    this.clinicaService.create(this.clinica).subscribe(() => {
      if(this.paciente.perfis.length === 1){
      this.addPerfil();
      this.updateCliente();
      }
      this.toast.success('Serviço cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['home'])
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.fotEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  validaCampos(): boolean {
    return this.categoria.valid && this.nmNegocio.valid &&
      this.email.valid && this.nrInsc.valid &&
      this.telefone.valid
  }

  findAdmin(): void {
    let id = localStorage.getItem('id');
    this.clienteService.findById(id).subscribe(resposta => {
      this.clinica.admin = parseInt(resposta.id);
      this.clinica.nomeAdmin = resposta.nome;
      this.paciente = resposta;
    })
  }

  updateCliente(): void {
    this.clienteService.update(this.paciente).subscribe(() => {
      this.toast.success('Paciente atualizado com sucesso', 'Update');
    }), ex => {
      if (ex.error.errors) {
        ex.error.errors.fotEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    }
  }

  addPerfil(): void {
    this.paciente.perfis = [];
    this.paciente.perfis.push('0', '1');
    console.log(this.paciente.perfis);
  }
}