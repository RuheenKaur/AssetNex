export interface AssetsHistoryModel

{
    id: number,
    assetId: number,
    asset: string,
    userId: number,
    user: string,
    statusId: number,
    status: string,
    eventType: string,
    eventDate: Date,
    referenceTicketId: number,
    assignedDate: Date,
    returnedDate: Date,
    remarks: Date,
    performedAt: Date,
    vendor: number,
    costIncurred: number
  }
