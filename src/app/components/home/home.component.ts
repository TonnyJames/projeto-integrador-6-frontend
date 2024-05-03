import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ClinicaService} from "../../services/clinica.service";
import {Clinica} from "../../models/clinica";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    categoriaSelecionada: number;
    clinicasEncontradasLista: Clinica[];

    CategoriaFormControl: FormControl = new FormControl(null, [Validators.required]);

    constructor(
        private clinicaService: ClinicaService,
    ) {
    }

    ngOnInit(): void {

    }

    public pesquisar() {
        if (this.categoriaSelecionada) {
            this.clinicaService.findByCategoria(this.categoriaSelecionada).subscribe(clinicasLista => {
                this.clinicasEncontradasLista = clinicasLista
            })
        } else {
            this.clinicaService.findAll().subscribe(clinicasLista => {
                this.clinicasEncontradasLista = clinicasLista
            })
        }
    }

}
