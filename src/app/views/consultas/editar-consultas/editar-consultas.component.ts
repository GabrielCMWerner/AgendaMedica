import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import ConsultasService from '../services/consultas.service';
import { Observable, map } from 'rxjs';
import { ListarMedicosViewModel } from '../../medicos/models/listar-medicos.View-Model';
import { FormsConsultasViewModel } from '../models/forms-consultas.View-Model';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-editar-consultas',
  templateUrl: './editar-consultas.component.html',
  styleUrls: ['./editar-consultas.component.scss']
})
export class EditarConsultasComponent {

    form?: FormGroup;
    medicos$?: Observable<ListarMedicosViewModel[]>

    constructor(
      private fb: FormBuilder,
      private consultasService: ConsultasService,
      private notification: NotificationService,
      private router: Router,
      private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.form = this.fb.group({
        titulo: new FormControl('', [Validators.required]),
        data: new FormControl('', [Validators.required,]),
        horaInicio: new FormControl('', [Validators.required]),
        horaTermino: new FormControl('', [Validators.required]),
        medicoId: new FormControl('', [Validators.required]),
      }) 
    

      this.medicos$ = this.route.data.pipe(map(dados => dados['medicos']));

      const consulta = this.route.snapshot.data['consulta'];

      this.form.patchValue(consulta);
    }

    campoEstaInvalido(nome: string) {
      return this.form?.get(nome)!.touched && this.form?.get(nome)!.invalid;
    }

    gravar(): void {
      const id = this.route.snapshot.paramMap.get('id')!;

      this.consultasService.editar(id, this.form?.value).subscribe({
        next: (res) => this.processarSucesso(res),
        error: (err) => this.processarFalha(err),
      });
    }
    processarSucesso(res: FormsConsultasViewModel) {
      this.router.navigate(['/consultas', 'listar']);
    }

    processarFalha(err: any) {
      this.notification.erro(err.error.erros[0]);
    }

}