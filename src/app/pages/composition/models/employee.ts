import { BaseResourceModel } from "src/app/shared/components/model/base-resource.model";

export class Employee extends BaseResourceModel {

  constructor(
    public registration?: string,
    public name?: string,
    public occupation?: string,
    public leadership?: string,
    public base_salary?: number,
    public status?: string,
    public team?: string,
  ) {
    super();
  }

  static fromJson(jsonData: any): Employee {
    return Object.assign(new Employee(), jsonData);
  }

}
