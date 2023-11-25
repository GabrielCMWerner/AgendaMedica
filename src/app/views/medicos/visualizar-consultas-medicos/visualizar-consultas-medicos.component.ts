import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ListarConsultasViewModel } from '../../consultas/models/listar-consultas.View-Model';

@Component({
  selector: 'app-visualizar-consultas-medico',
  templateUrl: './visualizar-consultas-medicos.component.html',
  styleUrls: ['./visualizar-consultas-medicos.component.scss']
})
export class VisualizarConsultasMedicoComponent {

  consultas$?: Observable<ListarConsultasViewModel[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.consultas$ = this.route.data.pipe(map(dados => dados['consultas']));
    console.log(this.consultas$);
  }
}
