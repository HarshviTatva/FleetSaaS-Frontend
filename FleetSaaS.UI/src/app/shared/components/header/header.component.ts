import { Component, EventEmitter, inject, input, OnInit, Output, Signal, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TokenService } from '../../../core/auth/services/token.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
@Component({
  selector: 'app-header',
  imports: 
  [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone:true
})

export class HeaderComponent implements OnInit{
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  userName!:string;

  pageTitle = signal('Dashboard');

sidebarOpen = input<WritableSignal<boolean>>();

  constructor(){
    this.router.events
    .pipe(filter(e => e instanceof NavigationEnd))
    .subscribe(() => {
      this.pageTitle.set(this.route.snapshot.firstChild?.data['title'] ?? 'Dashboard');
    });
  }

  ngOnInit(): void {
    this.getUserDetail();
  }

  getUserDetail(){
    this.userName = this.tokenService.getUserNameFromToken();
  }

  logout(){
    this.tokenService.logout();
  }

  toggleSidebar() {
   this.sidebarOpen()?.update(v => !v);
  }

}
