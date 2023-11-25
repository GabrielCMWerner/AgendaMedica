import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ConsultasService } from './services/consultas.service';
import { ListarConsultasComponent } from './listar-consultas/listar-consultas.component';

import { MedicosService } from '../medicos/services/medicos.service';
import { VisualizarConsultasViewModel } from './models/visualizar-consultas.View-Model';
import { EditarConsultasComponent } from './editar-consultas/editar-consultas.component';
import { ExcluirConsultasComponent } from './excluir-consultas/excluir-consultas.component';
import { InserirConsultasComponent } from './inserir-consultas/inserir-consultas.component';

const formsConsultasResolver = (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('id')!;

  return inject(ConsultasService).selecionarPorId(id);
};

const listarConsultasResolver = () => {
  return inject(ConsultasService).selecionarTodos();
};

const visualizarConsultasResolver: ResolveFn<VisualizarConsultasViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ConsultasService).selecionarPorId(
    route.paramMap.get('id')!
  );
};

const listarMedicosResolver = () => {
  return inject(MedicosService).selecionarTodos();
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
    resolve: { consulta: formsConsultasResolver,  medicos: listarMedicosResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirConsultasComponent,
    resolve: { consulta: visualizarConsultasResolver },
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
