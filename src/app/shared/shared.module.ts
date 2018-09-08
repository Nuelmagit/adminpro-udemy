import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';



@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        SidebarComponent,
        NopagefoundComponent,
        HeaderComponent,
        BreadcrumsComponent
    ],
    exports: [
        SidebarComponent,
        NopagefoundComponent,
        HeaderComponent,
        BreadcrumsComponent
    ],
})
export class SharedModule {}
