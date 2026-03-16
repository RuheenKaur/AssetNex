export interface AssetsHistoryModel {
  id: number;
  assetId: number;
  asset: {
    assetTag: string;
    assetType: string;
  } | null;
  userId: number;
  user: {
    fullName: string;
    email: string;
  } | null;
  statusId: number;
  status: string;
  eventType: string;
  eventDate: Date;
  referenceTicketId: number;
  assignedDate: Date | null;
  returnedDate: Date | null;
  remarks: string;
  performedAt: Date;
  vendor: string;
  costIncurred: number;
}
