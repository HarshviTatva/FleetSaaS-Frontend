import { Component, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TokenService } from '../../../core/auth/services/token.service';
import { MATERIAL_IMPORTS } from '../../utils/material.static';
import { LAYOUT, ROUTE_PATH } from '../../utils/route-path.static';
@Component({
  selector: 'app-header',
  imports:
    [
      ...MATERIAL_IMPORTS
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true
})

export class HeaderComponent implements OnInit {
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  userName!: string;

  pageTitle = signal('Dashboard');

  sidebarOpen = input<WritableSignal<boolean>>();

  constructor() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.pageTitle.set(this.route.snapshot.firstChild?.data['title'] ?? 'Dashboard');
      });
  }

  ngOnInit(): void {
    this.getUserDetail();
  }

  getUserDetail() {
    this.userName = this.tokenService.getUserNameFromToken();
  }

  logout() {
    this.tokenService.logout();
  }

  toggleSidebar() {
    this.sidebarOpen()?.update(v => !v);
  }

  redirectToUserProfile() {
  this.router.navigate([LAYOUT, ROUTE_PATH.USER_PROFILE]);
  }

}
