export interface AssetsHistoryModel {
  id: number;
  assetId: number;
  assetTag: string;
  assetType: string;
  userId: number;
  userName: string;
  eventType: string;
  remarks: string;
  performedAt: Date;
  modifiedBy: string;
}
