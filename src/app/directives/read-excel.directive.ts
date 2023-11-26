import * as XLSX from 'xlsx';
import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Directive({
  selector: '[appReadExcel]',
  exportAs: 'readexcel',
})
export class ReadExcelDirective {
  excelObservable!: Observable<any>;
  @Output() eventEmitter = new EventEmitter();

  constructor() { }

  @HostListener('change', ['$event.target'])
  onChange(target: HTMLInputElement) {
    const file = (target as any).files[0];

    this.excelObservable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    this.excelObservable.subscribe(data => this.eventEmitter.emit(data))

  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target?.result;

      const wb: XLSX.WorkBook = XLSX.read(bufferArray, { type: 'buffer' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);

      subscriber.next(data);
      subscriber.complete();
    }
  }


}

