import { Component, OnInit } from '@angular/core';

import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SocketService]
})
export class AppComponent implements OnInit{
  
  constructor(private socketService:SocketService){

  }
  
  ngOnInit(){
    
  }
}
