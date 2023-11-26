import { Component, OnInit } from '@angular/core';
import { MedicosService } from '../services/medicos.service';
import { Observable, map } from 'rxjs';
import { ListarMedicosViewModel } from '../models/listar-medicos.View-Model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listar-medicos',
  templateUrl: './listar-medicos.component.html',
  styleUrls: ['./listar-medicos.component.scss']
})
export class ListarMedicosComponent implements OnInit{

  medicos$?: Observable<ListarMedicosViewModel[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.medicos$ = this.route.data.pipe(map(dados=> dados['medico']));
  }
}

