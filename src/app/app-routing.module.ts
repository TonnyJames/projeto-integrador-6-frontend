import { ClinicaReadComponent } from './components/clinica/clinica-read/clinica-read.component';
import { ClinicaListComponent } from './components/clinica/clinica-list/clinica-list.component';
import { ConsultaListComponent } from './components/api-relatorio/consulta-list/consulta-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

//componentes da aplicação
import { AgendamentoCreateComponent } from './components/agendamento/agendamento-create/agendamento-create.component'; 
import { AgendamentoListComponent } from './components/agendamento/agendamento-list/agendamento-list.component';
import { AgendamentoReadComponent } from './components/agendamento/agendamento-read/agendamento-read.component';
import { AgendamentoUpdateComponent } from './components/agendamento/agendamento-update/agendamento-update.component';
import { PacienteCreateComponent } from './components/paciente/paciente-create/paciente-create.component';
import { PacienteDeleteComponent } from './components/paciente/paciente-delete/paciente-delete.component';
import { PacienteListComponent } from './components/paciente/paciente-list/paciente-list.component';
import { PacienteUpdateComponent } from './components/paciente/paciente-update/paciente-update.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { ColaboradorCreateComponent } from './components/colaborador/colaborador-create/colaborador-create.component';
import { ColaboradorDeleteComponent } from './components/colaborador/colaborador-delete/colaborador-delete.component';
import { ColaboradorListComponent } from './components/colaborador/colaborador-list/colaborador-list.component';
import { ColaboradorUpdateComponent } from './components/colaborador/colaborador-update/colaborador-update.component';
import { RegistrarPacienteComponent } from './components/registar-button/registrar-paciente/registrar-paciente.component';
import { ClinicaCreateComponent } from './components/clinica/clinica-create/clinica-create.component';
import { ConsultaComponent } from './components/api-relatorio/consulta/consulta.component';



const routes: Routes = [


      { path: 'login', component: LoginComponent },
      { path: 'registrarcliente', component: RegistrarPacienteComponent },
      { path: 'consulta', component: ConsultaComponent},
      { path: 'api/:cpf', component: ConsultaListComponent},
      { path: 'agendamento/read/:id', component: AgendamentoReadComponent },
      
      {path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent },

      { path: 'colaboradores', component: ColaboradorListComponent },
      { path: 'colaboradores/create', component: ColaboradorCreateComponent },
      { path: 'colaboradores/update/:id', component: ColaboradorUpdateComponent },
      { path: 'colaboradores/delete/:id', component: ColaboradorDeleteComponent },

      { path: 'servicos', component: ClinicaListComponent },
      { path: 'servicos/read/:id', component: ClinicaReadComponent},
      { path: 'servicos/create', component: ClinicaCreateComponent },

      { path: 'clientes', component: PacienteListComponent },
      { path: 'clientes/create', component: PacienteCreateComponent },
      { path: 'clientes/update/:id', component: PacienteUpdateComponent },
      { path: 'clientes/delete/:id', component: PacienteDeleteComponent },
      

      { path: 'agendamentos', component: AgendamentoListComponent },
      { path: 'agendamentos/create/:id', component: AgendamentoCreateComponent },
      { path: 'agendamentos/:id', component: AgendamentoUpdateComponent },
      { path: 'agendamentos/read/:id', component: AgendamentoReadComponent }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
