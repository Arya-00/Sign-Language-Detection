import { Component } from '@angular/core';
import { NgxDotpatternComponent } from '@omnedia/ngx-dotpattern';
import { NgxMeteorsComponent } from '@omnedia/ngx-meteors';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgxDotpatternComponent, NgxMeteorsComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

}
