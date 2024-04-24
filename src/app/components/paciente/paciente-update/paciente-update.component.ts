import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-update',
  templateUrl: './paciente-update.component.html',
  styleUrls: ['./paciente-update.component.css']
})
export class PacienteUpdateComponent implements OnInit {

  cliente: Paciente = {
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
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  validaCampos(): boolean {
    return this.nome.valid && this.email.valid && this.cpf.valid && this.senha.valid
  }
  findById(): void{
    this.service.findById(this.cliente.id).subscribe(resposta =>{
      resposta.perfis = []
      this.cliente =  resposta;
    })
  }

  update(): void {
    this.service.update(this.cliente).subscribe(() => {
      this.toast.success('Paciente atualizado com sucesso', 'Update');
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
    this.cliente.perfis.push(perfil);

    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
      console.log(this.cliente.perfis);
    } else {
      this.cliente.perfis.push(perfil);
      console.log(this.cliente.perfis);
    }
  }
}
