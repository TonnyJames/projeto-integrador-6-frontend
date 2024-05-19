import {Categorias} from "./enum/Categorias";

export interface Clinica {
    id?: any;
    categorias: [Categorias];
    nmNegocio: string;
    nrInsc: string; //cpf ou cnpj
    telefone: string;
    email: string;
    dataCriacao: any;
    admin: any;
    nomeAdmin: string;
}