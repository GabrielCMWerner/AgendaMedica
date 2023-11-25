import { Component, OnInit } from '@angular/core';
import { VisualizarConsultasViewModel } from '../models/visualizar-consultas.View-Model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConsultasService } from '../services/consultas.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-excluir-consultas',
  templateUrl: './excluir-consultas.component.html',
  styleUrls: ['./excluir-consultas.component.scss']
})
export class ExcluirConsultasComponent implements OnInit {

  consultasVM?: Observable<VisualizarConsultasViewModel>;

  constructor(
    private consultasService: ConsultasService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.consultasVM = this.route.data.pipe(map((res) => res['consulta']));
  }

  gravar() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.consultasService.excluir(id).subscribe(() => {
      this.toastrService.success(
        `A consulta foi excluída com sucesso!`,
        'Sucesso'
      );

      this.router.navigate(['/consultas', 'listar']);
    });
  }

}
