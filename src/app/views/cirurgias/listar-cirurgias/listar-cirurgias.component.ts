import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

import { CirurgiasService } from '../services/cirugias.service';
import { ListarCirurgiasViewModel } from '../models/listar-cirurgias.View-Model';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-listar-cirurgias',
  templateUrl: './listar-cirurgias.component.html',
  styleUrls: ['./listar-cirurgias.component.scss'],
})
export class ListarCirurgiasComponent implements OnInit {

  cirurgia$?: Observable<ListarCirurgiasViewModel[]>;

  constructor(private route: ActivatedRoute, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.cirurgia$ = this.route.data.pipe(map(dados => dados['cirurgias']));;
  }
}