import { ListarMedicosViewModel } from "../../medicos/models/listar-medicos.View-Model";

export type VisualizarCirurgiasViewModel = {
  id: string,
  titulo: string;
  data: Date;
  horaInicio: Date;
  horaTermino: Date;
  nomeMedico: string;
  medicos: ListarMedicosViewModel[];
};