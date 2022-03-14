import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


import {TranslatePipe} from './pipes/Translate.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserComponent } from './user/user.component'
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { ChatComponent } from './chat/chat.component';
import {MatIconModule} from '@angular/material/icon';
import { BattleshipComponent } from './games/battleship/battleship.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import {MatDialogModule} from '@angular/material/dialog';

const config: SocketIoConfig = {
  url: environment.socketUrl,
  options: {
    transports: ['websocket']
  }
}


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    TranslatePipe,
    PageNotFoundComponent,
    UserComponent,
    ChatComponent,
    BattleshipComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    SocketIoModule.forRoot(config),
    MatIconModule,
    DragDropModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
