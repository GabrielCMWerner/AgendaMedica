import { Component } from '@angular/core';
import { ListarCirurgiasViewModel } from '../../cirurgias/models/listar-cirurgias.View-Model';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-visualizar-cirurgias-medico',
  templateUrl: './visualizar-cirurgias-medicos.component.html',
  styleUrls: ['./visualizar-cirurgias-medicos.component.scss']
})
export class VisualizarCirurgiasMedicoComponent {

  cirurgias$?: Observable<ListarCirurgiasViewModel[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cirurgias$ = this.route.data.pipe(map(dados => dados['cirurgias']));
    console.log(this.cirurgias$);
  }
}
