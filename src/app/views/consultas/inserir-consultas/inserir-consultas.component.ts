import { Component, OnInit } from '@angular/core';
import ConsultasService from '../services/consultas.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListarMedicosViewModel } from '../../medicos/models/listar-medicos.View-Model';
import { MedicosService } from '../../medicos/services/medicos.service';
import { Observable, map } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { FormsConsultasViewModel } from '../models/forms-consultas.View-Model';

@Component({
  selector: 'app-inserir-consultas',
  templateUrl: './inserir-consultas.component.html',
  styleUrls: ['./inserir-consultas.component.scss']
})
export class InserirConsultasComponent implements OnInit {

  form?: FormGroup;
  medicos$?: Observable<ListarMedicosViewModel[]>;

  constructor(
    private fb: FormBuilder,
    private consultasService: ConsultasService,    
    private notification: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required,]),
      horaInicio: new FormControl('', [Validators.required]),
      horaTermino: new FormControl('', [Validators.required]),
      medicoId: new FormControl('', [Validators.required]),
    });


    this.medicos$ = this.route.data.pipe(map(dados => dados['medicos']));
   
  }

  campoEstaInvalido(titulo: string) {
    return this.form?.get(titulo)!.touched && this.form?.get(titulo)!.invalid;
  }

  gravar(): void {
    this.consultasService.criar(this.form?.value).subscribe({
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