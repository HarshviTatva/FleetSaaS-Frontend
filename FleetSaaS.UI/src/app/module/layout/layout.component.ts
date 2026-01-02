import { Component, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
@Component({
  selector: 'app-layout',
  imports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone:true
})

export class LayoutComponent {
  isSidebarOpen: WritableSignal<boolean> = signal(true);
}
