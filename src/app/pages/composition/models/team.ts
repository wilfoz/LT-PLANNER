import { BaseResourceModel } from "src/app/shared/components/model/base-resource.model";

export class Team extends BaseResourceModel {

  constructor(
    public name?: string,
    public tooling_cost?: number,
  ) {
    super();
  }

  static fromJson(jsonData: any): Team {
    return Object.assign(new Team(), jsonData);
  }

}
