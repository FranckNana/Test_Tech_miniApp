import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiniAppAccueilComponent } from './mini-app-accueil/mini-app-accueil.component';
import { DataService } from './Services/data.service';
import { RouterModule, Routes } from '@angular/router';
import { SingleDataComponent } from './single-data/single-data.component';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  {path: 'miniAppAccueil', component: MiniAppAccueilComponent},
  {path: 'miniAppAccueil/single-data/:id', component: SingleDataComponent},
  {path: 'single-data/miniAppAccueil', component: MiniAppAccueilComponent},
  {path: '', redirectTo: 'miniAppAccueil', pathMatch: 'full' },
  {path: '**', redirectTo: 'miniAppAccueil'}
]

@NgModule({
  declarations: [
    AppComponent,
    MiniAppAccueilComponent,
    SingleDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
