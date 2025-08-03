// Archivo: public/src/app/app.ts

// Asegúrate de tener los imports necesarios
import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
// ¡Cambia el nombre de la clase de 'AppComponent' a 'App'!
export class App {
  constructor(private http: HttpClient) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const body = this.encode({ 'form-name': form.name, ...form.value });

      this.http.post('/', body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).subscribe(
        () => {
          alert('¡Mensaje enviado con éxito!');
          form.reset();
        },
        (error) => {
          alert('Ocurrió un error al enviar el mensaje.');
          console.error(error);
        }
      );
    }
  }

  private encode(data: any): string {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  }
}