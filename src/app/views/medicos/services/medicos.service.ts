import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { FormsMedicosViewModel } from "../models/forms-medicos.View-Model";
import { VisualizarMedicosViewModel } from "../models/visualizar-medicos.View-Model";
import { ListarMedicosViewModel } from "../models/listar-medicos.View-Model";
import { ListarConsultasViewModel } from "../../consultas/models/listar-consultas.View-Model";
import { ListarCirurgiasViewModel } from "../../cirurgias/models/listar-cirurgias.View-Model";

@Injectable()
export class MedicosService {
  private API_URL = `${environment.API_URL}/Medico`;

  constructor(private http: HttpClient) {}

  criar(medico: FormsMedicosViewModel): Observable<FormsMedicosViewModel> {
    return this.http.post<FormsMedicosViewModel>(this.API_URL, medico);
  }

  editar(id: string, medico: FormsMedicosViewModel): Observable<FormsMedicosViewModel> {
    const url = `${this.API_URL}/${id}`;

    return this.http.put<FormsMedicosViewModel>(url, medico);
  }

  excluir(id: string): Observable<any> {
    const url = `${this.API_URL}/${id}`;

    return this.http.delete<VisualizarMedicosViewModel>(url);
  }

  selecionarPorId(id: string): Observable<VisualizarMedicosViewModel> {
    const url = `${this.API_URL}/visualizacao-completa/${id}`;

    return this.http.get<any>(url)
    .pipe(map(res => res.dados));
  }

  selecionarTodos(): Observable<ListarMedicosViewModel[]> {
    return this.http.get<any>(this.API_URL)
    .pipe(map(res => res.dados));
  }

  selecionarConsultasMedico(id: string): Observable<ListarConsultasViewModel[]> {
    const url = `${this.API_URL}/visualizar-medico-consultas/${id}`;
    return this.http.get<any>(url)
    .pipe(map(res => res.dados));
  }

  selecionarCirurgiasMedico(id: string): Observable<ListarCirurgiasViewModel[]> {
    const url = `${this.API_URL}/visualizar-medico-cirurgias/${id}`;
    return this.http.get<any>(url)
    .pipe(map(res => res.dados));
  }

}
  
  