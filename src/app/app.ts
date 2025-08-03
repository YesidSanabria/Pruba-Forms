// Archivo: public/src/app/app.ts

// Asegúrate de tener los imports necesarios
import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // Aquí debes agregar los módulos para usar el formulario y HttpClient
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  constructor(private http: HttpClient) { }

  onSubmit(form: NgForm) {
    // Si el formulario es válido
    if (form.valid) {
      // Netlify necesita que los datos estén en un formato específico
      const body = this.encode({ 'form-name': form.name, ...form.value });

      // Envía la petición POST a la raíz de tu sitio
      this.http.post('/', body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).subscribe(
        () => {
          alert('¡Mensaje enviado con éxito!');
          form.reset(); // Opcional: Limpia el formulario
        },
        (error) => {
          alert('Ocurrió un error al enviar el mensaje.');
          console.error(error);
        }
      );
    }
  }

  // Método auxiliar para codificar los datos del formulario
  private encode(data: any): string {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  }
}