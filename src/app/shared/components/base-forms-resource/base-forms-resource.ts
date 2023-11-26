import { OnInit, Injector, Directive, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseResourceModel } from '../model/base-resource.model';
import { BaseResourceService } from '../service/base-service-resource';

@Directive()
export abstract class BaseFormsResourceComponent<T extends BaseResourceModel> implements OnInit {

  currentAction: string = '';
  resourceForm!: FormGroup;
  pageTitle!: string;
  serverErrorMessages: string[] = [];
  submittingForm: boolean = false;
  snackBar!: MatSnackBar;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData: any) => T,
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
    this.snackBar = this.injector.get(MatSnackBar);
  }

  ngOnInit() {
    this.buildResourceForm();
  }

  protected async createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    console.log('create: ', resource)
    try {
      await this.resourceService.create(resource);
      this.actionsForSuccess();
    } catch (error) {
      this.actionsForError(error);
    }
  }

  protected async updateResource(id: number){
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    const data = {
      ...resource,
      id: id
    }
    try {
      await this.resourceService.update(data);
      this.actionsForSuccess();
    } catch (error) {
      this.actionsForError(error);
    }
  }

  protected actionsForSuccess(){
    this.notify('Success!');
  }

  protected actionsForError(error: any){
    this.notify(error);
    this.submittingForm = false;
    if(error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde."]
  }

  protected notify(msg: string) {
    this.snackBar.open(msg, 'OK', {duration: 3000});
  }

  protected abstract buildResourceForm(): void;

}
