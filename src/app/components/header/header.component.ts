import { Component, OnInit } from '@angular/core';
import {Paciente} from "../../models/paciente";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {PacienteService} from "../../services/paciente.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuarioLogado: Paciente
  nmUsuario: string = ''

  constructor(private router: Router,
              private authService: AuthService,
              private clienteService: PacienteService,
              private toast: ToastrService) { }

  ngOnInit(): void {
    this.router.navigate(['home'])
    this.findAdmin();
  }

  findAdmin(): void {
    let id = localStorage.getItem('id');
    this.clienteService.findById(id).subscribe(resposta => {
      this.usuarioLogado = resposta;
      this.nmUsuario = resposta.nome;
    })
  }

  logout() {
    this.router.navigate(['login'])
    this.authService.logout();
    this.toast.info('Logout Realizado', 'Logout', {timeOut: 3000})
  }

}
