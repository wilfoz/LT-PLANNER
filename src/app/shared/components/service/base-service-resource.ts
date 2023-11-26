import { BaseResourceModel } from '../model/base-resource.model';

import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError, tap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export class BaseResourceService<T extends BaseResourceModel> {
  private subject = new BehaviorSubject<T[]>([]);
  resource$: Observable<T[]> = this.subject.asObservable();
  protected http: HttpClient;
  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.http = injector.get(HttpClient);
    this.initialStateResource();
  }
  getAll(pagination: { page: number; totalPerPage: number }) {
    const { page, totalPerPage } = pagination;
    const queryParams = `?page=${page}&totalPerPage=${totalPerPage}`;

    return this.http
      .get<T[]>(this.apiPath + queryParams)
      .pipe(
        map(this.jsonDataToResources.bind(this)),
        catchError(this.handleError)
      );
  }
  getById(id: number): Observable<T> {
    return this.resource$.pipe(
      map((res) => {
        const index = res.findIndex((resource) => resource.id == id);
        return res[index];
      })
    );
  }
  create(resource: T) {
    return this.http
      .post(this.apiPath, resource)
      .pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
      )
      .subscribe({
        next: (data) => {
          const items: T[] = this.subject.getValue();
          items.push(resource);
          this.subject.next(items);
          return resource;
        },
        error: (e) => console.log(e),
      });
  }
  update(resource: T) {
    const url = `${this.apiPath}/${resource.id}`;
    const id = resource.id;
    delete resource.id;

    return this.http
      .patch(url, resource)
      .pipe(
        map((data) => data),
        catchError(this.handleError)
      )
      .subscribe({
        next: (res) => {
          const items: T[] = this.subject.getValue();
          const index = items.findIndex((element) => (element.id = id));
          items[index] = res;
          this.subject.next(items);
          return res;
        },
        error: (error) => error,
      });
  }
  delete(id: number) {
    const url = `${this.apiPath}/${id}`;
    return this.http
      .delete(url)
      .pipe(
        map((data) => data),
        catchError(this.handleError)
      )
      .subscribe({
        next: (data) => {
          const items: T[] = this.subject.getValue();
          const filteredItems = items.filter((element) => element.id != id);
          this.subject.next(filteredItems);
          return data;
        },
        error: (error) => console.log(error),
      });
  }
  // PRIVATE METHODS
  private initialStateResource() {
    this.getAll({ page: 0, totalPerPage: 800 }).subscribe((data) =>
      this.subject.next(data)
    );
  }

  // PROTECTED METHODS
  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach((element) =>
      resources.push(this.jsonDataToResourceFn(element))
    );
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO => ', error);
    return throwError(error);
  }
}
