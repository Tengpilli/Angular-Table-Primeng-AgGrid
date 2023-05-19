import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataViewType } from '../interface/table'


@Injectable()
export class DataViewService {
  constructor(private http: HttpClient) { }

    getTableData() {
        return this.http.get<any>('assets/MOCK_DATA.json')
            .toPromise()
            .then(res => <DataViewType[]>res.data)
            .then(data => { return data; });
    }
}
