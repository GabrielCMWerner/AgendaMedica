import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConsultasService } from '../services/consultas.service';
import { Observable, map } from 'rxjs';
import { ListarMedicosViewModel } from '../../medicos/models/listar-medicos.View-Model';

@Component({
  selector: 'app-editar-consultas',
  templateUrl: './editar-consultas.component.html',
  styleUrls: ['./editar-consultas.component.scss']
})
export class EditarConsultasComponent {

    form?: FormGroup;
    medicos?: Observable<ListarMedicosViewModel[]>

    constructor(
      private formBuilder: FormBuilder,
      private consultasService: ConsultasService,
      private toastrService: ToastrService,
      private router: Router,
      private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.form = this.formBuilder.group({
        titulo: [''],
        data: [''],
        horaInicio: [''],
        horaTermino: [''],
        medicoId: new FormControl(''),
      });    

      this.medicos = this.route.data.pipe(map(dados => dados['medicos']));

      const consulta = this.route.snapshot.data['consulta'];

      this.form.patchValue(consulta);
    }

    campoEstaInvalido(nome: string) {
      return this.form?.get(nome)!.touched && this.form?.get(nome)!.invalid;
    }

    gravar() {
      if (this.form?.invalid) {
        for (let erro of this.form.validate()) {
          this.toastrService.warning(erro);
        }

        return;
      }

      const id = this.route.snapshot.paramMap.get('id')!;

      this.consultasService.editar(id, this.form?.value).subscribe((res) => {
        this.toastrService.success(
          `A consulta "${res.titulo}" foi editada com sucesso!`,
          'Sucesso'
        );

        this.router.navigate(['/consultas/listar']);
      });
    }

}