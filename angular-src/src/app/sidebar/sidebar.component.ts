import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SocketService } from '../socket.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  newQuotesSub:Subscription;
  deletedQuotesSub:Subscription;
  notificationSub:Subscription;
  quotes:Array<string> = [];
  newQuote:string = "";

  constructor(public socketService:SocketService) { }

  ngOnInit() {
    // Subscribe to "notification" event
    this.notificationSub = this.socketService.getNotifications().subscribe(notification => {
      alert(notification);
    });

    // Subscribe to "new quote" event
    this.newQuotesSub = this.socketService.getNewQuotes().subscribe(quote => {
      this.quotes.push(<string> quote);
    });

    // Subscribe to "delete quote" event
    this.deletedQuotesSub = this.socketService.getDeletedQuotes().subscribe(quote => {
      const index = this.quotes.indexOf(<string> quote);
      if(index >= 0){
        this.quotes.splice(index, 1);
      }
    });
  }

  onSubmit(e){
    e.preventDefault();
    if(this.newQuote !== ""){
      this.socketService.addNewQuote(this.newQuote);
      this.newQuote = "";
    }
  }

  onDelete(quote:string){
    this.socketService.deleteQuote(quote);
  }

  ngOnDestroy(){
    this.newQuotesSub.unsubscribe();
    this.deletedQuotesSub.unsubscribe();
    this.notificationSub.unsubscribe();
  }

}
