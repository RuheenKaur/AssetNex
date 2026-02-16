
export interface AssetRequest {
  name: string;
  id:number;
  email: string;
  contact: string;
  requestedAssetType: string;
  reason: string;
}


export interface AssetRequestsPayload
{
  assetId:number,
  reason:string,
  requestedAssetType:string,

}

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
    requestedOn:Date

}//post









