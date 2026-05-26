export interface AdminAssetRequest
{
    id: number,
    name:string,
    contact:number,
    email:string,
    asset: string,
    requestedAssetType: string,
    reason: string ,
    status:string,
    requestedOn:Date,
    adminNotes?: string;
statusId:number,
}//post








