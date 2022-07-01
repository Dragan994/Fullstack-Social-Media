import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


import {TranslatePipe} from './pipes/Translate.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainViewComponent } from './mainView/main-view.component'
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { ChatComponent } from './chat/chat.component';
import {MatIconModule} from '@angular/material/icon';
import { BattleshipComponent } from './games/battleship/battleship.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RequestPasswordComponent } from './dialogs/request-password/request-password.component';
import { FeedComponent } from './feed/feed.component';
import { PostComponent } from './feed/post/post.component';
import { LikeListDialogComponent } from './dialogs/like-list-dialog/like-list-dialog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { ColorTesterComponent } from './color-tester/color-tester.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UserPostOwnerComponent } from './user/user-post-owner/user-post-owner.component';
import { CommentComponent } from './feed/comment/comment.component';
import { UserSnackbarComponent } from './user/user-snackbar/user-snackbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsideComponent } from './aside/aside.component';
import { UserPhotosComponent } from './user/user-photos/user-photos.component';
import { ImagePreviewThumbnailComponent } from './image-preview-thumbnail/image-preview-thumbnail.component';
import { PostDeletePromptComponent } from './dialogs/post-delete-prompt/post-delete-prompt.component';
import { ImagePreviewFullscreenComponent } from './image-preview-fullscreen/image-preview-fullscreen.component';
import { UserPostsComponent } from './user/user-posts/user-posts.component';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { UserFriendsComponent } from './user/user-friends/user-friends.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { ChatCardComponent } from './chat-card/chat-card.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { NotificationListComponent } from './notifications/notification-list/notification-list.component';
import { NotificationCardComponent } from './notifications/notification-card/notification-card.component';

const socketConfig: SocketIoConfig = {
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
    MainViewComponent,
    ChatComponent,
    BattleshipComponent,
    UpdateUserComponent,
    RequestPasswordComponent,
    FeedComponent,
    PostComponent,
    LikeListDialogComponent,
    UserProfileComponent,
    ColorTesterComponent,
    NavigationComponent,
    UserPostOwnerComponent,
    CommentComponent,
    UserSnackbarComponent,
    AsideComponent,
    UserPhotosComponent,
    ImagePreviewThumbnailComponent,
    PostDeletePromptComponent,
    ImagePreviewFullscreenComponent,
    UserPostsComponent,
    UserInfoComponent,
    UserFriendsComponent,
    ImageUploaderComponent,
    ChatCardComponent,
    ChatMessageComponent,
    NotificationListComponent,
    NotificationCardComponent
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
    SocketIoModule.forRoot(socketConfig),
    MatIconModule,
    DragDropModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    MatExpansionModule,
    MatMenuModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
