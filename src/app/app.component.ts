import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'csvdatawithlinechart';
  dummylinechart = [];
  lineChartData = [];
  lineChartLabels = [];
  displaychart = false;
  years = [];
  csvContent: string;
  // public lineChartOptions:any = {
  //   responsive: true
  // };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  
  constructor() {
   
  }
  
  onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;              
    this.csvContent = textFromFileLoaded;     
    let csvRecordsArray = this.csvContent.split(/\r\n|\n/);
   
    var res = csvRecordsArray;
    var subobject = {data:[],label:''};
    for(var j=0;j<csvRecordsArray.length-1; j++){
      var res = csvRecordsArray[j].split(",");
      for (var i=0;i<res.length;i++) {
        if(res[i].indexOf('SERIES')>-1) {
          subobject.label = res[i];
         
          continue;  
          } else {
             var slug = res[i].split('|').pop();
             subobject.data.push(slug);
             if(j == csvRecordsArray.length-2) {
              this.years.push(res[i].substr(0, res[i].indexOf('|')));
             }
            
            
           //  console.log(res[i]);
          }
 
     }
     this.dummylinechart.push(subobject);
     subobject = {data:[],label:''};
    
    }
    this.displaychart = true;
    this.displaylinechart(this.dummylinechart,this.years);

  }

  displaylinechart(data,yearsdata) {
     this.lineChartData  = data;
     this.lineChartLabels = yearsdata;
  
  }
  
  onFileSelect(input: HTMLInputElement) {
const files = input.files;
       if (files && files.length) {
         const fileToRead = files[0];
   const fileReader = new FileReader();
        fileReader.onload = this.onFileLoad.bind(this);
        fileReader.readAsText(fileToRead, "UTF-8");
   }

  }

 
}

