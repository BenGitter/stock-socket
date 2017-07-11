import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  url:string = "/";
  socket:any;

  constructor() { 
    console.log("Started SocketService")
    this.getMessages().subscribe(data => {
      console.log(data);
    });
  }

  getMessages() { 
    let observable = new Observable(observer => { 
      this.socket = io(this.url);
      this.socket.emit("new quote", "MSFT"); 
      this.socket.on('new quote', (data) => { 
        observer.next(data); 
      }); 
      return () => { 
        this.socket.disconnect(); 
      }; 
    });

    return observable; 
  } 
}
