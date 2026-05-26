// track-request.model.ts
export interface TrackRequestModel {
  id: number;
  requestedAssetType: string;
  reason: string;
  requestedOn: Date;
  statusId: number;
  adminNotes?: string;
  assetName?: string;
}
