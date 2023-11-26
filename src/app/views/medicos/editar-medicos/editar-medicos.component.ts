import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicosService } from '../services/medicos.service';
import { FormsMedicosViewModel } from '../models/forms-medicos.View-Model';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-editar-medicos',
  templateUrl: './editar-medicos.component.html',
  styleUrls: ['./editar-medicos.component.scss']
})
export class EditarMedicosComponent implements OnInit {
    form!: FormGroup;
    

    constructor(
      private fb: FormBuilder,
      private medicosService: MedicosService,
      private router: Router,
      private notification: NotificationService,
      private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.form = this.fb.group({
        crm: new FormControl('', [Validators.required]),
        nome: new FormControl('', [Validators.required]),
        telefone: new FormControl('', [Validators.required]),     
      });

      this.form.patchValue(this.route.snapshot.data['medico']);
    }

    campoEstaInvalido(nome: string) {
      return this.form?.get(nome)!.touched && this.form?.get(nome)!.invalid;
    }
  
    gravar(): void {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.medicosService.editar(id, this.form?.value).subscribe({
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