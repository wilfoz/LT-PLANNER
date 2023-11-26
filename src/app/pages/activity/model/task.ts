import { BaseResourceModel } from "src/app/shared/components/model/base-resource.model";

export class Task extends BaseResourceModel {

  constructor(
    public code?: number,
    public name?: string,
    public group?: string,
    public unity?: string,
    public total?: number,
    public is_mapped?: boolean,
    public stage?: string,
  ) {
    super();
  }

  static fromJson(jsonData: any): Task {
    return Object.assign(new Task(), jsonData);
  }

}
