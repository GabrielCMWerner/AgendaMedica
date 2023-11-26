import { Component, OnInit } from '@angular/core';
import { CirurgiasService } from '../services/cirugias.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListarMedicosViewModel } from '../../medicos/models/listar-medicos.View-Model';
import { MedicosService } from '../../medicos/services/medicos.service';

import { Observable, map } from 'rxjs';
import { FormsCirurgiasViewModel } from '../models/forms-cirurgias.View-Model';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-inserir-cirurgias',
  templateUrl: './inserir-cirurgias.component.html',
  styleUrls: ['./inserir-cirurgias.component.scss'],
})
export class InserirCirurgiasComponent implements OnInit {
  form?: FormGroup;
  medicos$?: Observable<ListarMedicosViewModel[]>;

  constructor(
    private fb: FormBuilder,
    private cirurgiasService: CirurgiasService,    
    private notification: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required]),
      horaInicio: new FormControl('', [Validators.required]),
      horaTermino: new FormControl('', [Validators.required]), 
      medicosSelecionados: [[]],
    });

    this.medicos$ = this.route.data.pipe(map(dados => dados['medicos']));
   
  }

  campoEstaInvalido(titulo: string) {
    return this.form?.get(titulo)!.touched && this.form?.get(titulo)!.invalid;
  }

  gravar(): void {
    this.cirurgiasService.criar(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }
  processarSucesso(res: FormsCirurgiasViewModel) {
    this.router.navigate(['/cirurgias', 'listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(err.error.erros[0]);
  }
}