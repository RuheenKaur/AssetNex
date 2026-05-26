
export interface SupportTicketsPostModel {
  items: never[];
  totalCount: number;
  id: number;

  assetConcerned: string;
  issueCategory: string;
  issueDescription: string;
  priority: string;
  status: string;
  resolvedAt:Date;
  createdAt: Date;
}


