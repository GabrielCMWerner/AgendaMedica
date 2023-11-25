import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicosService } from '../services/medicos.service';
import { FormsMedicosViewModel } from '../models/forms-medicos.View-Model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inserir-medicos',
  templateUrl: './inserir-medicos.component.html',
  styleUrls: ['./inserir-medicos.component.scss']
})
export class InserirMedicosComponent implements OnInit {
    form!: FormGroup;
    

    constructor(
      private fb: FormBuilder,
      private medicosService: MedicosService,
      private router: Router,
      private toastrService: ToastrService,
    ) {}

    ngOnInit(): void {
      this.form = this.fb.group({
        crm: new FormControl('', [Validators.required]),
        nome: new FormControl('', [Validators.required]),
        telefone: new FormControl('', [Validators.required]),     
      });
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
  
      this.medicosService.criar(this.form?.value).subscribe((res) => {
        this.toastrService.success(
          `O médico "${res.nome}" foi cadastrada com sucesso!`,
          'Sucesso'
        );
  
        this.router.navigate(['/medicos/listar']);
      });
    }
}
