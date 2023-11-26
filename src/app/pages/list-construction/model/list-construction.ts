import { BaseResourceModel } from "src/app/shared/components/model/base-resource.model";

export class ListConstruction extends BaseResourceModel {

  constructor(
    public tower?: string,
    public type?: string,
    public locality?: string,
    public coordinates?: string,
    public forward?: number,
    public height?: number,
    public weight?: number,
    public excavation_volume?: number,
    public concrete_volume?: number,
    public backfill_volume?: number,
    public steel_volume?: number,
    public type_of_foundation_A?: string,
    public type_of_foundation_B?: string,
    public type_of_foundation_C?: string,
    public type_of_foundation_D?: string,
    public type_of_foundation_MC?: string,
    public embargo?: string,
  ) {
    super();
  }

  static fromJson(jsonData: any): ListConstruction {
    return Object.assign(new ListConstruction(), jsonData);
  }

}
