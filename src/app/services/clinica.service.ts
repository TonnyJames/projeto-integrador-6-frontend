import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Clinica } from '../models/clinica';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {

  constructor(private http: HttpClient) { }

  findById(id: any):Observable<Clinica>{
    return this.http.get<Clinica>(`${API_CONFIG.baseUrl}/clinicas/${id}`);
  }

  findAll(): Observable<Clinica[]> {
    return this.http.get<Clinica[]>(`${API_CONFIG.baseUrl}/clinicas`);
  }

  findByCategoria(categoria: any): Observable<Clinica[]> {
    return this.http.get<Clinica[]>(`${API_CONFIG.baseUrl}/clinicas/porcategoria/${categoria}`);
  }
  create(clinica: Clinica): Observable<Clinica> {
    return this.http.post<Clinica>(`${API_CONFIG.baseUrl}/clinicas`, clinica)
  }

  update(clinica: Clinica): Observable<Clinica>{
    return this.http.put<Clinica>(`${API_CONFIG.baseUrl}/clinicas/${clinica.id}`, clinica)
  }

  delete(id: any): Observable<Clinica>{
    return this.http.delete<Clinica>(`${API_CONFIG.baseUrl}/clinicas/${id}`);
  }
}
