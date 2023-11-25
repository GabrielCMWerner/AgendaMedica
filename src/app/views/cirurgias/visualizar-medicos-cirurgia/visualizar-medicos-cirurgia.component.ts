import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { ListarMedicosViewModel } from '../../medicos/models/listar-medicos.View-Model';


@Component({
  selector: 'app-visualizar-medicos-cirurgia',
  templateUrl: './visualizar-medicos-cirurgia.component.html',
  styleUrls: ['./visualizar-medicos-cirurgia.component.scss']
})
export class VisualizarMedicoCirurgiaComponent {
  medicos$?: Observable<ListarMedicosViewModel[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.medicos$ = this.route.data.pipe(map(dados => dados['medicosCirurgia']), tap(x => console.log(x)));
  }
}