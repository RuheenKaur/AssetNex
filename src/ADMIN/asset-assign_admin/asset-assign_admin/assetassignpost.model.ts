export interface AssetAssignPost
{
  id: number
  assetId:number
  userId:number
  asset:string,
  assetAssigned:string,
  returnedOn:Date,
  assignedOn:Date
}
