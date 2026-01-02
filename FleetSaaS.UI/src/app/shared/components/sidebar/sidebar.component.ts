import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../interfaces/common.interface';
import { TokenService } from '../../../core/auth/services/token.service';
import { SIDEBAR_MENU } from '../../configs/sidebar.config';
import { MATERIAL_IMPORTS } from '../../utils/material.static';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule, ...MATERIAL_IMPORTS],
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
