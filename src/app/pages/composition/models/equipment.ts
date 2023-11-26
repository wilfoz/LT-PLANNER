import { BaseResourceModel } from "src/app/shared/components/model/base-resource.model";

export class Equipment extends BaseResourceModel {

  constructor(
    public model?: string,
    public manufacturer?: string,
    public license_plate?: string,
    public provider?: string,
    public cost?: number,
    public status?: string,
    public team?: string,
  ) {
    super();
  }

  static fromJson(jsonData: any): Equipment {
    return Object.assign(new Equipment(), jsonData);
  }

}
