import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { AlertController } from '@ionic/angular';
import { AnimationController} from '@ionic/angular';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage {
  @ViewChild('itemCuenta', {read: ElementRef}) itemCuenta!: ElementRef;
  @ViewChild('itemPassword', {read: ElementRef}) itemPassword!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;

  public usuario: Usuario;

  constructor(
      private router: Router
    , private activatedRoute: ActivatedRoute
    , private toastController: ToastController
    , private animationController: AnimationController)  
    
    
  {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(activatedRoute, router);
    this.usuario.cuenta = 'atorres';
    this.usuario.password = '1234';
  }

  ngAfterViewInit() {
    this.limpiarAnimandoRotacion();
  }

  ingresar() {
    const error = this.usuario.validarUsuario();
    if(error) {
      this.mostrarMensajeEmergente(error);
      return;
    } 
    this.mostrarMensajeEmergente('¡Bienvenido(a) al Sistema de Asistencia DUOC!');
    this.usuario.navegarEnviandousuario(this.router, '/inicio');
  }

  correo() {
    this.router.navigate(['/correo']);
  }

  async mostrarMensajeEmergente(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

  limpiarPagina() {
    this.usuario.cuenta = '';
    this.usuario.password = '';
  }

  limpiarAnimandoRotacion() {
    this.limpiarPagina();
    this.animarRotacion(this.itemCuenta.nativeElement, 800);
    this.animarRotacion(this.itemPassword.nativeElement, 1100);
  }

  animarRotacion(elementRef: any, duration: number) {
    this.animationController
      .create()
      .addElement(elementRef)
      .iterations(1)
      .duration(duration)
      .fromTo('transform', 'rotate(0deg)', 'rotate(360deg)')
      .play();
  }
 

}
