import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ClinicaService} from "../../services/clinica.service";
import {Clinica} from "../../models/clinica";
import {Router} from "@angular/router";
import {Categorias} from "../../models/enum/Categorias";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    categoriaSelecionada: number;
    CategoriaFormControl: FormControl = new FormControl(null, [Validators.required]);
    categoriasEnum = Categorias

    constructor(
        private clinicaService: ClinicaService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {

    }

    public encontrarClinicas() {
        this.router.navigate(['/clinicas'], {queryParams: {categoriaSelecionada: this.categoriaSelecionada},});
    }

}
