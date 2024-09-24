import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';
import { AnimationController} from '@ionic/angular';
import { animate, state, style, transition, trigger } from '@angular/animations';



@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
})

export class MisdatosPage implements AfterViewInit {
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;
  @ViewChild('itemCuenta', { read: ElementRef }) itemCuenta!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('itemCorreo', { read: ElementRef }) itemCorreo!: ElementRef;
  @ViewChild('itemPreguntaSecreta', { read: ElementRef }) itemPreguntaSecreta!: ElementRef;
  @ViewChild('itemRespuestaSecreta', { read: ElementRef }) itemRespuestaSecreta!: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef }) itemEducacion!: ElementRef;
  @ViewChild('itemFechaNacimiento', { read: ElementRef }) itemFechaNacimiento!: ElementRef;
  @ViewChild('itemPassword', { read: ElementRef }) itemPassword!: ElementRef;
 
 
  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();
  
  public usuario: Usuario;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController)
   { 
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
   }

   ngAfterViewInit() {
    this.animarTituloIzqDer();
    
  }

  public actualizarNivelEducacional(event: any) {
    this.usuario.nivelEducacional 
      = NivelEducacional.buscarNivelEducacional(event.detail.value)!;
  }

  limpiarPagina() {
    this.usuario.cuenta = '';
    this.usuario.nombre = '';
    this.usuario.apellido = '';
    this.usuario.correo = '';
    this.usuario.preguntaSecreta = '';
    this.usuario.respuestaSecreta = '';
    this.usuario.nivelEducacional = NivelEducacional.buscarNivelEducacional(1)!;
    this.usuario.fechaNacimiento = undefined;
    this.usuario.password = '';
    this.usuario.password = '';
  }

  animarTituloIzqDer() {
    this.animationController
      .create()
      .addElement(this.itemTitulo.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translate(0%)', 'translate(100%)')
      .fromTo('opacity', 0.2, 1)
      .play();
  }

  asignado(texto: string) {
    if (texto.trim() !== '') {
      return texto;
    }
    return 'No asignado';
  }

  mostrarDatosPersona() {
    if (this.usuario.cuenta.trim() === '') {
      this.mostrarMensajeAlerta('La cuenta es un campo obligatorio.');
      return;
    }

  this.usuario.nombre = this.usuario.nombre.trim();
  this.usuario.apellido = this.usuario.apellido.trim();
  if (this.usuario.nombre.trim() === '' && this.usuario.apellido === '') {
    this.mostrarMensajeAlerta('Debe ingresar al menos un nombre o un apellido.');
    return;
  }
  
  let mensaje = `
  <small>
    <b>Cuenta:     </b> ${this.usuario.cuenta} <br>
    <b>Usuario:    </b> ${this.usuario.correo} <br>
    <b>Nombre:     </b> ${this.asignado(this.usuario.nombre)} <br>
    <b>Apellido:   </b> ${this.asignado(this.usuario.apellido)} <br>
    <b>Correo:     </b> ${this.asignado(this.usuario.correo)} <br>
    <b>Pregunta Secreta </b> ${this.asignado(this.usuario.preguntaSecreta)} <br>
    <b>Respuesta Secreta </b> ${this.asignado(this.usuario.respuestaSecreta)} <br>
    <b>Educación:  </b> ${this.asignado(this.usuario.nivelEducacional.getEducacion())} <br>
    <b>Nacimiento: </b> ${this.usuario.getFechaNacimiento()}
    <b>Contraseña: </b> ${this.asignado(this.usuario.password)} <br>
    <b>Repetir Contraseña </b> ${this.asignado(this.usuario.password)} <br>

  </small>
`;
this.mostrarMensajeAlerta(mensaje);  

}

async mostrarMensajeAlerta(mensaje: string) {
  const alert = await this.alertController.create({
    header: 'Datos personales',
    message: mensaje,
    buttons: ['OK']
  });
  await alert.present();
}

navegar(pagina: string) {
  this.usuario.navegarEnviandousuario(this.router, pagina);
}




}
