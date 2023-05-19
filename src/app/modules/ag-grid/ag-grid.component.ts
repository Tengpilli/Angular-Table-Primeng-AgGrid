import { MatAccordion } from '@angular/material/expansion';
import { DataViewService } from '../../services/dataview.service';
import { DataViewType, HandleParamType } from '../../interface/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-dataview-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss'],
})
export class AgGridViewComponent implements OnInit {
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

  customerGridOptions: GridOptions;
  currentPage: number = 0;
  totPage: number = 1;
  totElements: number = 0;
  pageSize = 20;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    private dataViewService: DataViewService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.dataViewService.getTableData().then((data) => {
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

    this.configGrid();
  }

  handleChange(selectedOption?: MatCheckboxChange, type?: string) {
    switch (type) {
      case 'toEmail':
        if (selectedOption?.checked) {
          this.selectedToEmails.push(selectedOption.source.value);
        } else {
          const i = this.selectedToEmails.findIndex(
            (item) => item === selectedOption?.source.value
          );
          this.selectedToEmails = this.removeAt(this.selectedToEmails, i);
        }
        break;
      case 'fromEmail':
        if (selectedOption?.checked) {
          this.selectedFromEmails.push(selectedOption.source.value);
        } else {
          const i = this.selectedFromEmails.findIndex(
            (item) => item === selectedOption?.source.value
          );
          this.selectedFromEmails = this.removeAt(this.selectedFromEmails, i);
        }
        break;
      case 'firstName':
        if (selectedOption?.checked) {
          this.selectedFirstNames.push(selectedOption.source.value);
        } else {
          const i = this.selectedFirstNames.findIndex(
            (item) => item === selectedOption?.source.value
          );
          this.selectedFirstNames = this.removeAt(this.selectedFirstNames, i);
        }
        break;
      case 'lastName':
        if (selectedOption?.checked) {
          this.selectedLastNames.push(selectedOption.source.value);
        } else {
          const i = this.selectedLastNames.findIndex(
            (item) => item === selectedOption?.source.value
          );
          this.selectedLastNames = this.removeAt(this.selectedLastNames, i);
        }
        break;
      default:
        break;
    }
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

  isChecked(value: string, type: string) {
    switch (type) {
      case 'toEmail':
        return this.selectedToEmails.includes(value);
      case 'fromEmail':
        return this.selectedFromEmails.includes(value);
      case 'firstName':
        return this.selectedFirstNames.includes(value);
      case 'lastName':
        return this.selectedLastNames.includes(value);
      default:
        return false;
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

  private configGrid() {
    const columnDefs: ColDef[] = [
      {
        headerName: 'ID',
        field: 'id',
        sortable: true,
        resizable: true,
        cellStyle: (params) => {
          if (params.data && params.data.pickupMessage != null) {
            return { 'background-color': 'orange' };
          }
          return null;
        },
      },
      {
        headerName: 'First Name',
        field: 'first_name',
        filter: true,
        sortable: true,
        resizable: true,
        cellStyle: (params) => {
          if (params.data && params.data.pickupMessage != null) {
            return { 'background-color': 'orange' };
          }
          return null;
        },
      },
      {
        headerName: 'Last Name',
        field: 'last_name',
        filter: true,
        sortable: true,
        resizable: true,
      },
      {
        headerName: 'Email',
        field: 'email',
        sortable: true,
        resizable: true,
      },
      {
        headerName: 'Gender',
        field: 'gender',
        sortable: true,
        resizable: true,
      },
      {
        headerName: 'IP Address',
        field: 'ip_address',
        sortable: true,
        resizable: true,
      },
      {
        headerName: 'Confidental Status',
        field: 'confidential_status',
        sortable: true,
        resizable: true,
      },
      {
        headerName: 'File Type',
        field: 'file_type',
        sortable: true,
        resizable: true,
      },
      {
        headerName: 'Email To',
        field: 'email_to',
        filter: true,
        sortable: true,
        resizable: true,
      },
      {
        headerName: 'Email From',
        field: 'email_from',
        filter: true,
        sortable: true,
        resizable: true,
      },
      {
        headerName: 'Date sent',
        field: 'date_sent',
        sortable: true,
        resizable: true,
      },
      {
        headerName: 'Body',
        field: 'body',
        sortable: true,
        resizable: true,
      },
    ];
    this.customerGridOptions = {
      // suppressCellSelection: true,
      context: {
        componentParent: this,
        grid: 'customer',
      },
      rowSelection: 'multiple',
      columnDefs,
      headerHeight: 45,
      rowHeight: 30,
      overlayNoRowsTemplate:
        'No Orders were found! Please check filters and try again.',
      onGridReady: (params) => {
        params.api.sizeColumnsToFit();
        // this.search(0);
        // this.gridService.sizeColumnToFit(this.customerGridOptions);
      },
    };
  }

  removeAt(arr: any[], index: number) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }
}
