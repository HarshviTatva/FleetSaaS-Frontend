import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, Output, signal, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, RouterModule, CommonModule,MaterialModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone:true
})

export class SidebarComponent {
  accountsOpen = signal(false);
  sidebarOpen = input<Signal<boolean>>();

  toggleAccounts() {
    this.accountsOpen.update(v => !v);
  }
}
  