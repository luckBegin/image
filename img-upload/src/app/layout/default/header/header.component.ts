import { AfterViewChecked, Component , ViewChild } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { debug } from 'util';
import { LocalStorageService } from '../../../service/storage';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent{
  searchToggleStatus: boolean;

  constructor(
    public settings: SettingsService ,
    private ls : LocalStorageService
  ) {};

  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  };

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  };

  weekColor(){
    const bodyEle = document.querySelector('body') as HTMLBodyElement ;
    const reg = /^weekColor$/g ;
    if(reg.test(bodyEle.className)){
      bodyEle.className = '' ;
      this.ls.set("weekColor" , "false")
    }else {
      bodyEle.className = 'weekColor' ;
      this.ls.set("weekColor" , "true")
    };
  };
}
