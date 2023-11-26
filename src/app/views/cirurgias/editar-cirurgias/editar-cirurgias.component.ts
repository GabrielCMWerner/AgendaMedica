import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListarMedicosViewModel } from '../../medicos/models/listar-medicos.View-Model';
import { MedicosService } from '../../medicos/services/medicos.service';
import { CirurgiasService } from '../services/cirugias.service';
import { Observable, map } from 'rxjs';
import { FormsCirurgiasViewModel } from '../models/forms-cirurgias.View-Model';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-editar-cirurgia',
  templateUrl: './editar-cirurgias.component.html',
  styleUrls: ['./editar-cirurgias.component.scss'],
})
export class EditarCirurgiaComponent implements OnInit {
  form?: FormGroup;
  medicos?: Observable<ListarMedicosViewModel[]>

  constructor(
    private fb: FormBuilder,
    private cirurgiasService: CirurgiasService,
    private medicosService: MedicosService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: [''],
      data: [''],
      horaInicio: [''],
      horaTermino: [''],
      medicosSelecionados: [[]],
    });

    this.medicos = this.route.data.pipe(map(dados => dados['medicos']));

    const cirurgia = this.route.snapshot.data['cirurgia'];

    this.form.patchValue(cirurgia);

    
  }

  campoEstaInvalido(titulo: string) {
    return this.form?.get(titulo)!.touched && this.form?.get(titulo)!.invalid;
  }

  gravar(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.cirurgiasService.editar(id, this.form?.value).subscribe({
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
