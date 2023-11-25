import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsultasService } from '../services/consultas.service';
import { ListarConsultasViewModel } from '../models/listar-consultas.View-Model';

@Component({
  selector: 'app-listar-consultas',
  templateUrl: './listar-consultas.component.html',
  styleUrls: ['./listar-consultas.component.scss']
})
export class ListarConsultasComponent implements OnInit{

  consultas$?: Observable<ListarConsultasViewModel[]>;

  constructor(private consultasService: ConsultasService) {}

  ngOnInit(): void {
    this.consultas$ = this.consultasService.selecionarTodos();
  }
  

}
