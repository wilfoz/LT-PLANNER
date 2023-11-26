import { BaseResourceModel } from "src/app/shared/components/model/base-resource.model";

export class Production extends BaseResourceModel {

  constructor(
    public status?: string,
    public task?: string,
    public tower?: string,
    public team?: string,
    public productionDate?: Date,
    public startTimeOfDay?: string,
    public endTimeOfDay?: string,
    public weather?: string,
    public comments?: string,
  ) {
    super();
  }

  static fromJson(jsonData: any): Production {
    return Object.assign(new Production(), jsonData);
  }

}
