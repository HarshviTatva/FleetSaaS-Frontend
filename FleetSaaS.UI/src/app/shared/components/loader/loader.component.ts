import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '../../services/loader.service';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-loader',
  imports: [CommonModule, MatProgressSpinnerModule, SharedModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  public readonly loaderService = inject(LoaderService);
}
