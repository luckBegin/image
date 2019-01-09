import { Component, OnInit } from '@angular/core';
import { SysMenuService } from '../../../service/system/menu.service';
import { RESPONSE } from '../../../models';
import { filter } from 'rxjs/operators';
import { MsgService } from '../../../service/msg/msg.service';
import { AdaptorUtils } from '@shared/utils';
import { ngIfAnimation } from '../../../routes/router-animation';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from '../../../../decorators/service.decorator';

@Component({
  selector: 'sys-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  animations: [ngIfAnimation],
})
export class MenuComponent implements OnInit {
  constructor(
    private service: SysMenuService,
    private msg: MsgService,
    private fb: FormBuilder,
  ){};

  ngOnInit(): void {
    this.getList();
  };

  menuList: any[] = [];

  loading: boolean = true;

  hHeight: number = document.body.clientHeight - 204;

  menuShow: boolean = false;

  mouseHeight: number = 30;

  currentItem: any;

  isVisible: boolean = false;

  validateForm: FormGroup = this.fb.group({
    'url': [null, [Validators.required]],
    'iconPath': ['anticon anticon-bars', [Validators.required]],
    'parentId': [null],
    'isButton': [null, [Validators.required] ],
    'id': [null],
    'menuDescriptionVOS':this.fb.array( [this.createLocale()] ),
  });

  infoBoxShow: boolean = false;

  editMark: boolean = false;

  createLocale(item ?: any) : FormGroup{
    return this.fb.group({
      "description" : [item ? item.description : "" , [Validators.required] ] ,
      "locale" : ['zh-cn' , [Validators.required] ]
    });
  };

  get menuDescriptionVOS() : FormArray{
    return this.validateForm.get("menuDescriptionVOS") as FormArray ;
  };

  getList() {
    this.service.getAllmenu()
      .subscribe((res: RESPONSE) => {
        recursive(res.data);
        this.menuList = AdaptorUtils.makeTreeNode({ title: 'name', key: 'id' }, res.data);
        this.loading = false;
      });
  };

  add(isParent: boolean) {
    this.menuShow = false;
    this.validateForm.reset();
    this.infoBoxShow = true;
    this.editMark = false;

    let controlArr = < FormArray >this.validateForm.controls['menuDescriptionVOS'] ;
    this.validateForm.patchValue({ iconPath : "anticon anticon-bars"}) ;
    controlArr.patchValue([{locale : "zh-cn"}]) ;

    if (isParent)
      this.validateForm.patchValue({ id: 0 });
    else {
      const pid = this.currentItem.node.parentNode ? this.currentItem.node.key : 0;
      this.validateForm.patchValue({ parentId: pid });
    };
  };

  edit(): void {

    this.menuShow = false;

    this.infoBoxShow = true;

    this.editMark = true;

    this.currentItem.origin.isButton += "" ;

    this.validateForm.patchValue(this.currentItem.origin);

    let controlArr = < FormArray >this.validateForm.controls['menuDescriptionVOS'] ;
    controlArr.patchValue(this.currentItem.origin.menuDescriptions) ;
  };

  del(): void {
    this.menuShow = false;
    this.isVisible = true;
    this.validateForm.patchValue({ id: this.currentItem.key });
  };

  showMenu($event) {
    this.mouseHeight = $event.event.pageY - 70;
    this.menuShow = true;
    this.currentItem = $event.node;
  };s

  @Service('service.delete', true,() => this.validateForm.value )
  modalConfirm($event: Event) {
    this.msg.success('删除成功');
    this.isVisible = false;
    this.getList();
  };

  @Service('service.post', true, () => this.validateForm.value )
  makeNew($event: Event): void {
    this.msg.success("新建菜单成功")
    this.infoBoxShow = false ;
    this.getList() ;
  };

  @Service('service.put', true, () => this.validateForm.value )
  save($event: Event): void {
    this.msg.success("修改成功")
    this.infoBoxShow = false ;
    this.getList() ;
  };
}

let recursive = function(data) {
  data.forEach(item => {
    item['name'] = item.menuDescriptions[0]['description'];

    if (item['children'])
      recursive(item['children']);
  });
};
