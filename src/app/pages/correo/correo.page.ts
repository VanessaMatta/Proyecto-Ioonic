import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements AfterViewInit {
  correo: string = '';
  errorMessage: string | null = null;

  @ViewChild('ingresar', { read: ElementRef }) itemIngresar!: ElementRef;
  router: any;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private animationCtrl: AnimationController
  ) {}

  ngAfterViewInit() {
    this.animIngresarCont();
  }

  recuperarContrasena() {
    console.log('Correo ingresado:', this.correo); 
    const usuarios = Usuario.getListaUsuarios(); 
    const usuarioValido = usuarios.find(usuario => usuario.correo === this.correo); 

    if (usuarioValido) {
      console.log('Usuario encontrado:', usuarioValido); 
      this.navCtrl.navigateForward('/pregunta', {
        state: { user: usuarioValido}
      });
    } else {
      this.errorMessage = 'Correo electronico no encontrado.';
      console.log(this.errorMessage); 
      this.toastCtrl.create({
        message: 'Credenciales incorrectas. Por favor, inténtelo de nuevo.',
        duration: 2000,
        color: 'danger',
        buttons: [
          {
            text: 'X',
            role: 'cancel'
          }
        ]
      }).then(toast => toast.present());
    }
  }
animIngresarCont() {
    this.animationCtrl
      .create()
      .addElement(this.itemIngresar.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .keyframes([
        { offset: 0, transform: 'scaleX(1)' },
        { offset: 0.5, transform: 'scaleX(1.05)' },
        { offset: 1, transform: 'scaleX(1)' }
      ])
      .easing('ease-in-out')
      .play();
  }

}