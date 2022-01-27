import { Component, OnInit } from '@angular/core';

interface ItemData {
  id: number;
  option_type: string;
  option_code: string;
  sap_code : string;
  wbs_code : string;
  option_group_name : string;
  option_name : string;
}

@Component({
  selector: 'nz-demo-table-row-selection-custom',
  template: `
    <nz-table
      #rowSelectionTable
      nzShowSizeChanger
      [nzData]="listOfAllData"
      (nzCurrentPageDataChange)="currentPageDataChange($event)"
    >
      <thead>
        <tr>
          <th
            nzShowCheckbox
            nzShowRowSelection
            [nzSelections]="listOfSelection"
            [(nzChecked)]="isAllDisplayDataChecked"
            [nzIndeterminate]="isIndeterminate"
            (nzCheckedChange)="checkAll($event)"
          ></th>
          <th>ID</th>
          <th>옵션유형</th>
          <th>옵션그룹 명</th>
          <th>옵션명</th>
          <th>옵션코드</th>
          <th>SAP 자재코드</th>
          <th>WBS 코드</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of rowSelectionTable.data">
          <td nzShowCheckbox [(nzChecked)]="mapOfCheckedId[data.id]" (nzCheckedChange)="refreshStatus()"></td>
          <td>{{ data.id }}</td>
          <td>{{ data.option_type }}</td>
          <td>{{ data.option_group_name }}</td>
          <td>{{ data.option_name }}</td>
          <td>{{ data.option_code }}</td>
          <td>{{ data.sap_code }}</td>
          <td>{{ data.wbs_code }}</td>
        </tr>
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableRowSelectionCustomComponent implements OnInit {
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.checkAll(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfDisplayData.forEach((data, index) => (this.mapOfCheckedId[data.id] = index % 2 !== 0));
        this.refreshStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfDisplayData.forEach((data, index) => (this.mapOfCheckedId[data.id] = index % 2 === 0));
        this.refreshStatus();
      }
    }
  ];
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: ItemData[] = [];
  listOfAllData: ItemData[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};

  currentPageDataChange($event: ItemData[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfAllData.push({
        id: i+1,
        option_type: `RANDOM`,
        option_code: 'M1234'+i,
        sap_code: 'BTTSNEWCLEARF'+i,
        wbs_code : 'FR10_220001-10'+i+1,
        option_group_name : '옵션그룹명',
        option_name : '옵션명',
      });
    }
  }
}