import { Component, OnInit } from '@angular/core';
import ConsultasService from '../services/consultas.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListarMedicosViewModel } from '../../medicos/models/listar-medicos.View-Model';
import { MedicosService } from '../../medicos/services/medicos.service';
import { Observable, map } from 'rxjs';

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
    private toastrService: ToastrService,
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

  gravar() {
    if (this.form?.invalid) {
      for (let erro of this.form.validate()) {
        this.toastrService.warning(erro);
      }

      return;
    }

    this.consultasService.criar(this.form?.value).subscribe((res) => {
      this.toastrService.success(
        `A consulta "${res.titulo}" foi cadastrada com sucesso!`,
        'Sucesso'
      );

      this.router.navigate(['/consultas/listar']);
    });
  }

  
}