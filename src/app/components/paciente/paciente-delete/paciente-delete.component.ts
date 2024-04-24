import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-delete',
  templateUrl: './paciente-delete.component.html',
  styleUrls: ['./paciente-delete.component.css']
})
export class PacienteDeleteComponent implements OnInit {

  paciente: Paciente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(
    private service: PacienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paciente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }
  
  findById(): void{
    this.service.findById(this.paciente.id).subscribe(resposta =>{
      resposta.perfis = []
      this.paciente =  resposta;
    })
  }

  delete(): void {
    this.service.delete(this.paciente.id).subscribe(() => {
      this.toast.success('Paciente deletado com sucesso', 'Delete');
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
}
