import { Component, Input, OnInit } from '@angular/core' ;
import { SearchBarModel } from '@shared/component/search-bar/search-bar.model';
import { DateUtils } from '@shared/utils';

@Component({
  selector: 'common-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.less'],
})
export class SearchBarComponent implements OnInit {
  constructor() {
  } ;

  ngOnInit(): void {
    this.query = this.constructObject();
  };


  constructObject(): object {
    const _obj = {};
    const _this = this ;
    this.SearchBarData.conditions.forEach(item => {
      if (item.model){
        _obj[item.model] = item.default ? item.default : '';
      };

      if(item.type === 'date' || item.type === 'dateRange'){
        _this.dataType.push({
          format : item.format ,
          key : item.model
        });
      };
    });
    return _obj;
  };

  @Input()
  SearchBarData: SearchBarModel;

  query: object = {};

  dataType  : { format : string , key : string }[] = [] ;

  queryFn(): void {
    const data = this.formatData(this.query) ;
    this.SearchBarData.notify.query(data) ;
  };

  reset(): void {
    this.query = this.constructObject();
    const data = this.formatData(this.query) ;
    this.SearchBarData.notify.reset(data) ;
  };

  formatData( tar : object ): object {
    this.dataType.forEach( item => {
      if(tar[item.key]){
        tar[item.key] = DateUtils.format(tar[item.key] , item.format) ;
      };
    });
    return tar ;
  }
}
