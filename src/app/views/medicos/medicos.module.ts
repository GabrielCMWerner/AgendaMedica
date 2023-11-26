import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosRoutingModule } from './medicos-routing.module';
import { ListarMedicosComponent } from './listar-medicos/listar-medicos.component';
import { InserirMedicosComponent } from './inserir-medicos/inserir-medicos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicosService } from './services/medicos.service';
import { EditarMedicosComponent } from './editar-medicos/editar-medicos.component';
import 'src/app/extensions/form-group.extension';
import { VisualizarCirurgiasMedicoComponent } from './visualizar-cirurgias-medicos/visualizar-cirurgias-medicos.component';
import { VisualizarConsultasMedicoComponent } from './visualizar-consultas-medicos/visualizar-consultas-medicos.component'; 
import { ExcluirMedicosComponent } from './excluir-medicos/excluir-medicos.component';

@NgModule({
  declarations: [
    ListarMedicosComponent,
    InserirMedicosComponent,
    EditarMedicosComponent,
    ExcluirMedicosComponent,
    VisualizarCirurgiasMedicoComponent,
    VisualizarConsultasMedicoComponent,
    
  ],
  imports: [
    CommonModule,
    MedicosRoutingModule,
    SharedModule,
    ReactiveFormsModule,   
  ],
  providers: [MedicosService],
})
export class MedicosModule { }
