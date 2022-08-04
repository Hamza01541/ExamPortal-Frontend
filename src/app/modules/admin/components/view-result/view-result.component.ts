import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {
  result: any;
  constructor(public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,) { 
      if(config.data){
        console.log('config.dat: ', config.data);
        this.result = config.data;
        
      }
    }

  ngOnInit(): void {
    console.log('this.result: ', this.result);
  }

}
