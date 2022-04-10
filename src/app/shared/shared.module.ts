import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from '../app.routing.module';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [HeaderComponent, LoadingSpinnerComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [HeaderComponent, LoadingSpinnerComponent],
})
export class SharedModule {}
