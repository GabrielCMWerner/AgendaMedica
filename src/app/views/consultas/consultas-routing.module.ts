import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarConsultasComponent } from './listar-consultas/listar-consultas.component';
import { MedicosService } from '../medicos/services/medicos.service';

import { EditarConsultasComponent } from './editar-consultas/editar-consultas.component';
import { ExcluirConsultasComponent } from './excluir-consultas/excluir-consultas.component';
import { InserirConsultasComponent } from './inserir-consultas/inserir-consultas.component';
import ConsultasService from './services/consultas.service';
import { FormsConsultasViewModel } from './models/forms-consultas.View-Model';
import { VisualizarConsultasViewModel } from './models/visualizar-consultas.View-Model';



const listarConsultasResolver = () => {
  return inject(ConsultasService).selecionarTodos();
};

const listarMedicosResolver = () => {
  return inject(MedicosService).selecionarTodos();
};

const formsConsultaResolver: ResolveFn<FormsConsultasViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ConsultasService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarConsultaResolver: ResolveFn<VisualizarConsultasViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ConsultasService).selecionarPorIdCompleto(
    route.paramMap.get('id')!
  );
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarConsultasComponent,
    resolve: { consultas: listarConsultasResolver },
  },
  {
    path: 'inserir',
    component: InserirConsultasComponent,
    resolve: { medicos: listarMedicosResolver },
  },
  {
    path: 'editar/:id',
    component: EditarConsultasComponent,
    resolve: { consulta: formsConsultaResolver, medicos: listarMedicosResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirConsultasComponent,
    resolve: { consulta: visualizarConsultaResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }