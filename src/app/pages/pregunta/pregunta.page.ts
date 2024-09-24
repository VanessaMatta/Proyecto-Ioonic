import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  public user: Usuario;
  public respuesta: string = '';


  constructor(
    private rutaActivada: ActivatedRoute,
    private ruta: Router) 
    { 
    this.user = new Usuario();
    this.rutaActivada.params.subscribe(params => {
      const nav=this.ruta.getCurrentNavigation()
      if(nav){ 
        if(nav.extras.state && nav.extras.state["user"]){
          this.user=nav.extras.state["user"];
          console.log(this.user);
        }
      }
    })
  }

  ngOnInit() {
  }

  public validarRespuesSecreta(): void {
   if (this.user.respuestaSecreta === this.respuesta) {
    alert('CORRECTO! TU CLAVES ES ' + this.user.password);
   } 
   else {
    alert('INCORRECTO!!! INGRESE RESPUESTA CORRECTA');
   }
  }

  public navegarLogin(): void{
    this.ruta.navigate(['/ingreso']);
  }

  navegar(pagina: string) {
    this.user.navegarEnviandousuario(this.ruta, pagina);
  }

}
