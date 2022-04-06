import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CoreModule } from './modules/core.module';
import { ParentModule } from './modules/parent.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule,CoreModule,ParentModule],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule {}   