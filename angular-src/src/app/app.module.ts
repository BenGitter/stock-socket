import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { SocketService } from './socket.service';
import { StockService } from './stock.service';

import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    SocketService,
    StockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
