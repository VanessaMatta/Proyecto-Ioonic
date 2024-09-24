import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IonicModule } from '@ionic/angular';

import { MisdatosPageRoutingModule } from './misdatos-routing.module';

import { MisdatosPage } from './misdatos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    IonicModule,
    MisdatosPageRoutingModule
  ],
  declarations: [MisdatosPage]
})
export class MisdatosPageModule {}
