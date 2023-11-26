import { VisualizarMedicosViewModel } from "../../medicos/models/visualizar-medicos.View-Model";

export type FormsConsultasViewModel = {
  titulo: string;
  data: Date;
  horaInicio: Date;
  horaTermino: Date;
  medico: VisualizarMedicosViewModel;
  medicoId: string;
};