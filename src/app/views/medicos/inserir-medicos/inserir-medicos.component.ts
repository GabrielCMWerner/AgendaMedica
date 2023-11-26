import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicosService } from '../services/medicos.service';
import { FormsMedicosViewModel } from '../models/forms-medicos.View-Model';
import { NotificationService } from 'src/app/core/notification/services/notification.service';


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
      private notification: NotificationService,
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
  
    gravar(): void {
      this.medicosService.criar(this.form?.value).subscribe({
        next: (res) => this.processarSucesso(res),
        error: (err) => this.processarFalha(err),
      });
    }

    processarSucesso(res: FormsMedicosViewModel) {
      this.router.navigate(['/medicos', 'listar']);
    }

    processarFalha(err: any) {
      this.notification.erro(err.error.erros[0]);
    }
}
