import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsHistoryModel } from './asset-history.model';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AssetHistoryService } from './asset-history.service';

@Component({
  selector: 'app-asset-history',
  imports: [CommonModule, TableModule, FormsModule, InputTextModule],
  templateUrl: 'asset-history.html',
  styleUrl: 'asset-history.css',
})
export class AssetHistory implements OnInit {


  history: AssetsHistoryModel[] = [];
  filteredHistory: AssetsHistoryModel[] = [];
  selectedEventType: string = '';
  drawerOpen: boolean = false;
  selectedAssetTag: string = '';
  assetTimeline: AssetsHistoryModel[] = [];

  constructor(
    private router: Router,
    private assetHistoryService: AssetHistoryService
  ) {}

  ngOnInit(): void {
    this.assetHistoryService.getAllAssetsHistory().subscribe({
      next: (data) => {
        this.history = data;
        this.filteredHistory = data;
        console.log('Asset History loaded:', data);
      },
      error: (err) => console.error('Failed to load history', err)
    });
  }


  filterByEvent(): void {
    if (!this.selectedEventType) {
      this.filteredHistory = this.history;
    } else {
      this.filteredHistory = this.history.filter(
        h => h.eventType === this.selectedEventType
      );
    }
  }


  openDrawer(item: AssetsHistoryModel): void {
    this.selectedAssetTag = item.asset?.assetTag || `Asset #${item.assetId}`;


    this.assetTimeline = this.history
      .filter(h => h.assetId === item.assetId)
      .sort((a, b) =>
        new Date(a.performedAt).getTime() - new Date(b.performedAt).getTime()
      );

    this.drawerOpen = true;
  }


  closeDrawer(): void {
    this.drawerOpen = false;
    this.selectedAssetTag = '';
    this.assetTimeline = [];
  }

  getEventCount(eventType: string): number {
    return this.assetTimeline.filter(e => e.eventType === eventType).length;
  }

  goBack(): void {
    this.router.navigateByUrl('/admin/dashboard');
  }
}
