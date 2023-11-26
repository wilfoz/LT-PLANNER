import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MenuListItemComponent } from '../menu-list-item/menu-list-item.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { DashComponent } from 'src/app/pages/dash/dash.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    DefaultComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MenuListItemComponent,
    DashComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    SharedModule,
  ],
  exports: [
    SharedModule,
  ],
  providers: []
})
export class DefaultModule { }
