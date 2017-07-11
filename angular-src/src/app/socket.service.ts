import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  url:string = "/";
  socket:any;

  constructor() { 
    // Setup socket.io connection
    this.socket = io(this.url);

    // For testing: emit "new quote" event
    this.socket.emit("new quote", "MSFT"); 

    // Subscribe to "notification" event
    this.getNotifications().subscribe(notification => {
      console.log(notification);
    });
  }

  getNewQuotes(){ 
    let observable = new Observable(observer => { 
      this.socket.on('new quote', (quote) => { 
        observer.next(quote); 
      }); 
      return () => { 
        this.socket.disconnect(); 
      }; 
    });

    return observable; 
  } 

  getNotifications(){
    let observable = new Observable(observer => { 
      this.socket.on('notification', (notification) => { 
        observer.next(notification); 
      }); 
      return () => { 
        this.socket.disconnect(); 
      }; 
    });

    return observable; 
  }

  addNewQuote(quote){
    this.socket.emit("new quote", quote);
  }
}
