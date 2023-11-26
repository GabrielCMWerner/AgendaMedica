import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { ListarConsultasComponent } from './listar-consultas/listar-consultas.component';
import { InserirConsultasComponent } from './inserir-consultas/inserir-consultas.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarConsultasComponent } from './editar-consultas/editar-consultas.component';
import { ExcluirConsultasComponent } from './excluir-consultas/excluir-consultas.component';
import 'src/app/extensions/form-group.extension';
import { MedicosService } from '../medicos/services/medicos.service';
import ConsultasService from './services/consultas.service';



@NgModule({
  declarations: [
    ListarConsultasComponent,
    InserirConsultasComponent,
    EditarConsultasComponent,
    ExcluirConsultasComponent,
    
  ],
  imports: [
    CommonModule,
    ConsultasRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],

  providers: [ConsultasService, MedicosService, DatePipe]
})
export class ConsultasModule { }
