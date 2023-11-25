import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VisualizarCirurgiasViewModel } from '../models/visualizar-cirgias.View-Model';
import { CirurgiasService } from '../services/cirugias.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-excluir-cirurgia',
  templateUrl: './excluir-cirurgias.component.html',
  styleUrls: ['./excluir-cirurgias.component.scss']
})
export class ExcluirCirurgiaComponent implements OnInit {
  cirurgiaVM?: Observable<VisualizarCirurgiasViewModel>;

  constructor(
    private cirurgiasService: CirurgiasService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cirurgiaVM= this.route.data.pipe(map((res) => res['cirurgia']));
  }

  gravar() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.cirurgiasService.excluir(id).subscribe(() => {
      this.toastrService.success(
        `A cirurgia foi excluída com sucesso!`,
        'Sucesso'
      );

      this.router.navigate(['/cirurgias', 'listar']);
    });
  }

}
