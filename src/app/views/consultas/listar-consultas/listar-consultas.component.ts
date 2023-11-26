import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import ConsultasService from '../services/consultas.service';
import { ListarConsultasViewModel } from '../models/listar-consultas.View-Model';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listar-consultas',
  templateUrl: './listar-consultas.component.html',
  styleUrls: ['./listar-consultas.component.scss']
})
export class ListarConsultasComponent implements OnInit{

  consultas$?: Observable<ListarConsultasViewModel[]>;

  constructor(private route: ActivatedRoute, private datePipe: DatePipe)  {}

  ngOnInit(): void {
    this.consultas$ = this.route.data.pipe(map(dados => dados['consultas']));
  }
  

}
