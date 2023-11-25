import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListarConsultasViewModel } from '../models/listar-consultas.View-Model';
import { VisualizarConsultasViewModel } from '../models/visualizar-consultas.View-Model';
import { FormsConsultasViewModel } from '../models/forms-consultas.View-Model';
import { ListarMedicosViewModel } from '../../medicos/models/listar-medicos.View-Model';



@Injectable()
export class ConsultasService {
  private API_URL = `${environment.API_URL}/Consulta`;

  constructor(private http: HttpClient) {}

  criar(consulta: FormsConsultasViewModel): Observable<FormsConsultasViewModel> {
    return this.http.post<FormsConsultasViewModel>(this.API_URL, consulta);
  }

  editar(id: string, consulta: FormsConsultasViewModel): Observable<FormsConsultasViewModel> {
    const url = `${this.API_URL}/${id}`;

    return this.http.put<FormsConsultasViewModel>(url, consulta);
  }

  excluir(id: string): Observable<any> {
    const url = `${this.API_URL}/${id}`;

    return this.http.delete<VisualizarConsultasViewModel>(url);
  }

  selecionarPorIdCompleto(id: string): Observable<VisualizarConsultasViewModel> {
    const url = `${this.API_URL}/visualizacao-completa/${id}`;

    return this.http.get<any>(url)
    .pipe(map(res => res.dados));
  }

  selecionarPorId(id: string): Observable<FormsConsultasViewModel> {
    const url = `${this.API_URL}/${id}`;

    return this.http.get<any>(url)
    .pipe(map(res => res.dados));
  }

  selecionarTodos(): Observable<ListarConsultasViewModel[]> {
    return this.http.get<any>(this.API_URL)
    .pipe(map(res => res.dados));
  }

  selecionarTodosMedicosCirurgias(id: string): Observable<ListarMedicosViewModel[]> {
    const url = `${this.API_URL}/medicos/${id}`;

    return this.http.get<any>(url)
    .pipe(map(res => res.dados), tap(x => console.log(x)));
  }
}