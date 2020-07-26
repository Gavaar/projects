import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoyCardModule } from '@libs/moy-card/moy-card.module';
import { TransactionModule } from '../transaction/transaction.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, TransactionModule, MoyCardModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
