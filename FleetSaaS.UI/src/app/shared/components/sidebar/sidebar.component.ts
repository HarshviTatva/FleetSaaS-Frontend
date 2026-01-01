import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { MenuItem } from '../../interfaces/common.interface';
import { TokenService } from '../../../core/auth/services/token.service';
import { SIDEBAR_MENU } from '../../configs/sidebar.config';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule, MaterialModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: true
})

export class SidebarComponent implements OnInit {

  private readonly tokenService = inject(TokenService);

  sidebarOpen = input<Signal<boolean>>();
  openMenu = signal<string | null>(null);
  menuItems = signal<MenuItem[]>([]);

  ngOnInit(): void {
    this.menuItems.set(SIDEBAR_MENU[this.tokenService.getUserRoleFromToken()!]);
  }

  toggle(label: string): void {
    this.openMenu.set(this.openMenu() === label ? null : label);
  }
}
