import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';

import { DemoService } from './demo.service';

import { DemoListComponent } from './demo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DemoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
