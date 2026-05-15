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
  drawerOpen = false;
  selectedAssetTag = '';
  selectedAssetType = '';
  assetTimeline: AssetsHistoryModel[] = [];
  currentAssignee = '-';
  totalEvents = 0;

  constructor(
    private router: Router,
    private assetHistoryService: AssetHistoryService
  ) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.assetHistoryService.getAllAssetsHistory().subscribe({
      next: (data) => {
        this.history = data ?? [];
        this.filteredHistory = this.history;
        console.log('Asset History loaded:', data);
      },
      error: (err) => console.error('Failed to load history', err),
    });
  }

  filterByEvent(): void {
    this.filteredHistory = !this.selectedEventType
      ? this.history
      : this.history.filter(h => h.eventType === this.selectedEventType);
  }

  openDrawer(item: AssetsHistoryModel): void {
    this.selectedAssetTag = item.assetTag || '—';
    this.selectedAssetType = item.assetType || '—';

    this.assetTimeline = this.history
      .filter(h => h.assetId === item.assetId)
      .sort((a, b) =>
        new Date(b.performedAt).getTime() - new Date(a.performedAt).getTime()
      );

    this.totalEvents = this.assetTimeline.length;

    const lastAssigned = this.assetTimeline.find(
      e => e.eventType === 'Assigned' || e.eventType === 'ReAssigned'
    );
    const lastReturned = this.assetTimeline.find(
      e => e.eventType === 'Returned'
    );

    if (lastAssigned && (!lastReturned ||
      new Date(lastAssigned.performedAt) > new Date(lastReturned.performedAt))) {
      this.currentAssignee = lastAssigned.userName || '—';
    } else {
      this.currentAssignee = 'Unassigned';
    }
    this.drawerOpen = true;
  }

  closeDrawer(): void {
    this.drawerOpen = false;
    this.selectedAssetTag = '';
    this.assetTimeline = [];
    this.currentAssignee = '-';
  }

  getEventCount(eventType: string): number {
    return this.assetTimeline.filter(e => e.eventType === eventType).length;
  }

  goBack(): void {
    this.router.navigateByUrl('/admin/dashboard');
  }
}

