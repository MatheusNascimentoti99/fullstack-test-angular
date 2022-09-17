import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss']
})
export class PaginaComponent implements OnInit {
  form: FormGroup;
  public apiGreeting = '';
  public date = '';
  public responseForm = '';
  constructor(private apiService: ApiService, public fb: FormBuilder) {
    this.form = this.fb.group({
      description: [''],
    });
  }

  getDate() {
    this.apiService.getDate().pipe(
      catchError((err) => {
        this.date = 'Falha na comunicação com o servidor.';
        return [];
      })
    ).subscribe((response) => {
      if (response) {

        this.date = response.data;
        this.date = new Date(this.date).toLocaleString('pt-BR');
      }
    });
  };

  submit() {
    var formData: any = new FormData();
    console.log(this.form)
    formData.append('description', this.form.get('description').value);
    this.apiService.submitForm(formData).pipe(
      catchError((err) => {
        this.responseForm = 'Falha na comunicação com o servidor.';
        return [];
      })
    ).subscribe((response) => {
      if (response) {
        this.responseForm = response.data;
      }
    });
  }

  ngOnInit(): void {
    this.getDate();
    setInterval(() => {
      this.getDate()
    }, 5000);

    this.apiService.getHello().pipe(
      catchError((err) => {
        this.apiGreeting = 'Falha na comunicação com o servidor.';
        return [];
      })
    ).subscribe((response) => {
      if (response) {
        this.apiGreeting = response.mensagem;
      }
    });
  }

}
