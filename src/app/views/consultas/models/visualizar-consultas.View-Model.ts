import { ListarMedicosViewModel } from "../../medicos/models/listar-medicos.View-Model";

export type VisualizarConsultasViewModel = {
  id: string;
  titulo: string;
  data: Date;
  horaInicio: Date;
  horaTermino: Date;
  medico: ListarMedicosViewModel;
}