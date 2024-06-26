import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-create',
  templateUrl: './paciente-create.component.html',
  styleUrls: ['./paciente-create.component.css']
})
export class PacienteCreateComponent implements OnInit {

  paciente: Paciente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }



  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: PacienteService,
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    return this.nome.valid && this.email.valid && this.cpf.valid && this.senha.valid
  }

  create(): void {
    this.service.create(this.paciente).subscribe(() => {
      this.toast.success('Paciente cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['clientes'])
    }), ex => {
      if(ex.error.errors){
        ex.error.errors.fotEach(element =>{
          this.toast.error(element.message);
        });
      }else {
        this.toast.error(ex.error.message);
      }
    }
  }

  addPerfil(perfil: any): void {
    this.paciente.perfis.push(perfil);

    if (this.paciente.perfis.includes(perfil)) {
      this.paciente.perfis.splice(this.paciente.perfis.indexOf(perfil), 1);
      console.log(this.paciente.perfis);
    } else {
      this.paciente.perfis.push(perfil);
      console.log(this.paciente.perfis);
    }
  }
}
