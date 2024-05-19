import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClinicaService } from '../../../services/clinica.service';
import { Clinica } from 'src/app/models/clinica';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clinica-read',
  templateUrl: './clinica-read.component.html',
  styleUrls: ['./clinica-read.component.css']
})
export class ClinicaReadComponent implements OnInit {

  clinica: Clinica = {

    id: '',
    categorias: null,
    nmNegocio: '',
    nrInsc: '', //cpf ou cnpj
    telefone: '',
    email: '',
    dataCriacao: '',
    admin: '',
    nomeAdmin: '',
  }

  constructor(
    private clinicaService: ClinicaService,
    private toastService:   ToastrService,
    private route:          ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.clinica.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.clinicaService.findById(this.clinica.id).subscribe(resposta => {
      this.clinica = resposta;
    }, ex => {
      this.toastService.error(ex.console.error.error);
    })
  }

}
