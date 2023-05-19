import { DataViewService } from '../../../services/dataview.service';
import { DataViewType, HandleParamType } from '../../../interface/table';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-dataview',
  templateUrl: './dataview.component.html',
  styleUrls: ['./dataview.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DataViewComponent implements OnInit {
  originData: DataViewType[] = [];
  tableData: DataViewType[] = [];
  loading: boolean = true;
  isConfident: boolean | null = null;
  selectedData: DataViewType[] = [];

  //to Eamil
  toEmail: string;
  toEmails: string[];
  originToEmails: string[];
  isAllToEmail: boolean = true;
  selectedToEmails: string[] = [];

  //from Email
  fromEmail: string;
  fromEmails: string[];
  originFromEmails: string[];
  isAllFromEmail: boolean = true;
  selectedFromEmails: string[] = [];

  firstName: string;
  firstNames: string[];
  originFirstNames: string[];
  isAllFirstName: boolean = true;
  selectedFirstNames: string[] = [];

  lastName: string;
  lastNames: string[];
  originLastNames: string[];
  isAllLastName: boolean = true;
  selectedLastNames: string[] = [];

  name: string;

  @ViewChild('dt') table: Table;

  constructor(
    private tableService: DataViewService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.tableService.getTableData().then((data) => {
      this.originData = data;
      this.tableData = data;

      this.toEmails = this.tableData.map((item) => item.email_to);
      this.originToEmails = this.toEmails;
      this.selectedToEmails = this.toEmails;

      this.fromEmails = this.tableData.map((item) => item.email_from);
      this.originFromEmails = this.fromEmails;
      this.selectedFromEmails = this.fromEmails;

      this.firstNames = this.tableData.map((item) => item.first_name);
      this.originFirstNames = this.firstNames;
      this.selectedFirstNames = this.firstNames;

      this.lastNames = this.tableData.map((item) => item.last_name);
      this.originLastNames = this.lastNames;
      this.selectedLastNames = this.lastNames;

      this.loading = false;
    });

  }

  handleChange() {
    if (this.isConfident === true || this.isConfident === false) {
      this.tableData = this.filterData(
        this.originData.filter(
          (item) => item.confidential_status === this.isConfident
        )
      );
    }
    if (this.isConfident === null)
      this.tableData = this.filterData(this.originData);
  }

  handleSelectAll({ value = '' }: HandleParamType) {
    switch (value) {
      case 'toEmail':
        if (this.isAllToEmail) {
          this.selectedToEmails = this.originToEmails;
        } else {
          this.selectedToEmails = [];
        }
        break;
      case 'fromEmail':
        if (this.isAllFromEmail) {
          this.selectedFromEmails = this.originFromEmails;
        } else {
          this.selectedFromEmails = [];
        }
        break;
      case 'firstName':
        if (this.isAllFirstName) {
          this.selectedFirstNames = this.originFirstNames;
        } else {
          this.selectedFirstNames = [];
        }
        break;
      case 'lastName':
        if (this.isAllLastName) {
          this.selectedLastNames = this.originLastNames;
        } else {
          this.selectedLastNames = [];
        }
        break;

      default:
        break;
    }
    this.tableData = this.filterData(this.originData);
  }

  handleSearch({ value = '' }: HandleParamType) {
    switch (value) {
      case 'toEmail':
        this.toEmails = this.originToEmails.filter(
          (item) => item.indexOf(this.toEmail) > -1
        );
        break;
      case 'fromEmail':
        this.fromEmails = this.originFromEmails.filter(
          (item) => item.indexOf(this.fromEmail) > -1
        );
        break;
      case 'name':
        this.firstNames = this.originFirstNames.filter(
          (item) => item.toLowerCase().indexOf(this.name.toLowerCase()) > -1
        );
        this.lastNames = this.originLastNames.filter(
          (item) => item.toLowerCase().indexOf(this.name.toLowerCase()) > -1
        );
        break;
      default:
        break;
    }
  }

  filterData(data: DataViewType[]): DataViewType[] {
    return data.filter(
      (item) =>
        this.selectedToEmails.includes(item.email_to) &&
        this.selectedFromEmails.includes(item.email_from) &&
        this.selectedFirstNames.includes(item.first_name) &&
        this.selectedLastNames.includes(item.last_name)
    );
  }

  onDateSelect(e: Event) {
    this.table.filter(
      this.formatDate((<HTMLInputElement>e.target).value),
      'date',
      'equals'
    );
  }

  formatDate(date: string) {
    let month: string = `${new Date(date).getMonth() + 1}`;
    let day: string = `${new Date(date).getDate()}`;

    if (Number(month) < 10) {
      month = `${'0' + month}`;
    }

    if (Number(day) < 10) {
      day = `${'0' + day}`;
    }

    return new Date(date).getFullYear() + '-' + month + '-' + day;
  }
}
