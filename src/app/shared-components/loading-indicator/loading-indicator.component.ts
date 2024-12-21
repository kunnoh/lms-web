import { NgIf } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../services/loading.service/loading.service';

@Component({
  selector: 'app-loading-indicator',
  imports: [
    NgIf,
    MatProgressSpinnerModule,
  ],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.css'
})
export class LoadingIndicatorComponent {
  loadingService = inject(LoadingService);
  loading = this.loadingService.loading;
}
