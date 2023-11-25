import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarCirurgiasComponent } from './listar-cirurgias/listar-cirurgias.component';
import { InserirCirurgiasComponent } from './inserir-cirurgias/inserir-cirurgias.component';
import { EditarCirurgiaComponent } from './editar-cirurgias/editar-cirurgias.component';
import { ExcluirCirurgiaComponent } from './excluir-cirurgias/excluir-cirurgias.component';
import { CirurgiasService } from './services/cirugias.service';
import { MedicosService } from '../medicos/services/medicos.service';
import { FormsCirurgiasViewModel } from './models/forms-cirurgias.View-Model';
import { ListarMedicosViewModel } from '../medicos/models/listar-medicos.View-Model';
import { VisualizarMedicoCirurgiaComponent } from './visualizar-medicos-cirurgia/visualizar-medicos-cirurgia.component';

const listarCirurgiasResolver = () => {
  return inject(CirurgiasService).selecionarTodos();
};

const visualizarMedicosCirurgiaResolver: ResolveFn<ListarMedicosViewModel[]> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CirurgiasService).selecionarTodosMedicosCirurgias(
    route.paramMap.get('id')!
  );
};

const formsCirurgiasResolver = (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('id')!;  

  return inject(CirurgiasService).selecionarPorId(id);
};

const visualizarCirurgiasResolver: ResolveFn<FormsCirurgiasViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CirurgiasService).selecionarPorId(
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
    pathMatch: 'full'
  },

  {
    path: 'listar',
    component: ListarCirurgiasComponent,
    resolve: { cirurgias: listarCirurgiasResolver },
  },

  {
    path: 'inserir',
    component: InserirCirurgiasComponent,
    resolve: { medicos: listarMedicosResolver },
  },

  {
    path: 'editar/:id',
    component: EditarCirurgiaComponent,
    resolve: { cirurgia: formsCirurgiasResolver,  medicos: listarMedicosResolver}
  },

  {
    path: 'excluir/:id',
    component: ExcluirCirurgiaComponent,
    resolve: { cirurgia: visualizarCirurgiasResolver },
  },

  {
    path: 'medicos/:id',
    component: VisualizarMedicoCirurgiaComponent,
    resolve: { medicosCirurgia: visualizarMedicosCirurgiaResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CirurgiasRoutingModule { }
