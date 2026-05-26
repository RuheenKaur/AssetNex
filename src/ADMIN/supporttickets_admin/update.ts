export interface SupportTicketUpdate {
  assignedTo: string;
  status: string;
  resolutionNotes?: string;
  resolvedAt?: Date;
}
