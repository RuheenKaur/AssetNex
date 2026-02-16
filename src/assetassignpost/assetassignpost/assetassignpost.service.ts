import { HttpClient } from "@angular/common/http";
import { environment} from "../../environments/environment";
import { AssetAssignPost } from "./assetassignpost.model";
import { Observable,of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AssetAssignPostService {

  constructor(private http: HttpClient) {}
  getAllAssigned() {
    return this.http.get<AssetAssignPost[]>(`${environment.apibaseUrl}/api/AssetAssignments`);
  }

  reassign(payload: { assignmentId: number; newUserId: number }) {
    return this.http.put(
      `${environment.apibaseUrl}/api/AssetAssignments/reassign`,
      payload
    );
  }

  assignAsset(assetId: number, assignedToUserId: number, assignedByUserId: number) {
  return this.http.post(
    `${environment.apibaseUrl}/api/AssetAssignments/assign`,
    null,
    {
      params: {
        assetId,
        assignedToUserId,
        assignedByUserId
      }
    }
  );
}

  unassign(assignmentId: number) {
    return this.http.put(
      `${environment.apibaseUrl}/api/AssetAssignments/unassign/${assignmentId}`,
      {}
    );
  }
}

