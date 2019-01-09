import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../../service/system/role.service';
import { MsgService } from '../../../service/msg/msg.service';
import { SysMenuService } from '../../../service/system';
import { NzTreeComponent, NzTreeNode } from 'ng-zorro-antd';
import { RESPONSE } from '../../../models';
import { filter } from 'rxjs/operators';
import { TableData } from '@shared/component/table/table.model';
import { QueryModel } from './query.model';
import { Service } from '../../../../decorators/service.decorator';
import { AdaptorUtils } from '@shared/utils';
import { Before, CombineAll } from '../../../../decorators/function.decorator';
import { Observable } from 'rxjs';
import { a } from '@angular/core/src/render3';

@Component({
  selector: 'system-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less'],
})
export class RoleComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private msg: MsgService,
    private service: RoleService,
    private menuService: SysMenuService,
  ) {
  } ;

  ngOnInit() {
    this.getAllMenu();
  };

  form: FormGroup = this.fb.group({
    'name': [ null, [Validators.required]],
    'description': [ null ],
    'id': [ null ],
  });

  tableData = {
    loading: true,
    page: 1,
    columns: [
      { title: '角色名', type: 'text', reflect: 'name' },
      { title: '备注', type: 'text', reflect: 'description' },
    ],
    data: [],
    btn: {
      title: '操作',
      items: [
        {
          type: 'del',
          title: '删除',
          fn: (data) => {
            this.isVisible = true;
            this.form.patchValue(data);
          },
        }, {
          type: 'edit',
          title: '编辑',
          fn: (data) => {
            this.form.patchValue(data);
            this.editMark = true ;
            this.showEdit(data.id);
          },
        },
      ],
    },
  };

  queryModel: QueryModel = new QueryModel;

  isVisible: boolean = false;

  selectRoles: string[] = [];

  editMark: boolean = false;

  infoBoxShow: boolean = false;

  menuTree: any[];

  raw_data : any[];

  @ViewChild('treeCom') treeCom: NzTreeComponent;

  showEdit(roleId: number) {
    this.service.getRoleById(roleId)
      .subscribe((res: RESPONSE) => {
        let selectdKeys = [] ;
        res['data']['menuDTOS'].forEach( item => {
          selectdKeys.push( item.id ) ;
        });

        let _obj = [] ;

        this.menuTree.forEach( item => {
          _obj.push(new Tree(item, selectdKeys , null));
        });

        this.selectRoles = selectdKeys ;

        this.infoBoxShow = true ;

        this.menuTree = _obj ;

      });
  };

  pageChange($event) {
    ($event.type == 'size') && (this.queryModel.pageSize = $event.number);
    ($event.type == 'page') && (this.queryModel.currentPage = $event.number);
    this.getRoleList();
  };

  addNewRole() {
    this.form.reset();
    this.selectRoles = [];
    this.editMark = false;
    this.infoBoxShow = true;
  };


  getRoleList(): void {
    this.service.getList(this.queryModel)
      .subscribe((res: RESPONSE) => {
        this.tableData.loading = false;
        this.tableData.data = res.data;
      });
  }

  @Service('service.delete', true, () => this.form.value)
  modalConfirm($event: Event) {
    this.msg.success('删除成功');
    this.isVisible = false;
    this.getRoleList();
  };

  @Before(function($event){
    const selectKeys = this.treeCom.nzTreeService.getCheckedNodeList() ;
    if(selectKeys.length === 0 )
      this.msg.warn("注意,创建的该角色未包含任何权限") ;

    return new Observable( obsr => {
      const _arr= [] ;

      selectId(selectKeys , _arr) ;

      obsr.next(_arr)
    })
  })
  @CombineAll()
  makeNew($event :Event, selectdRoles : string[] ): void {
    const value = this.form.value ;
    value['menuIds '] = selectdRoles ;

    const ele = $event.target as HTMLButtonElement ;

    ele.disabled = true  ;

    this.service.post(value)
    .subscribe( ( res : RESPONSE) => {
      this.infoBoxShow = false ;
      this.getRoleList() ;
    })

  };

  @Before(function($event){
    const selectKeys = this.treeCom.nzTreeService.getCheckedNodeList() ;
    if(selectKeys.length === 0 )
      this.msg.warn("注意,创建的该角色未包含任何权限") ;

    return new Observable( obsr => {
      const _arr= [] ;

      selectId(selectKeys , _arr) ;

      obsr.next(_arr);
    });
  })
  @CombineAll()
  save($event : Event ,  selectdRoles : string[]): void {
    const value = this.form.value ;
    value['menuIds '] = selectdRoles ;

    const ele = $event.target as HTMLButtonElement ;

    ele.disabled = true  ;

    this.service.put(value)
      .subscribe( ( res : RESPONSE) => {
        this.infoBoxShow = false ;
        this.getRoleList() ;
      })
  };

  getAllMenu(): void {
    this.menuService.getAllmenu()
      .subscribe((res: RESPONSE) => {
        recursive(res.data);
        this.menuTree = AdaptorUtils.makeTreeNode({ title: 'name', key: 'id' }, res.data);
        this.raw_data = AdaptorUtils.makeTreeNode({ title: 'name', key: 'id' }, res.data) ;
      });
  };
}

let recursive = function(data) {
  data.forEach(item => {
    item['name'] = item.menuDescriptions[0]['description'];

    if (item['children'])
      recursive(item['children']);
  });
};
const selectId = function(arr : any[] , tar : string[] ){
  arr.forEach( item => {
    tar.push(item.key.toString()) ;
    if(item.children.length > 0 ){
      selectId(item.children , tar)
    };
  });
};
let Tree = function(option , selectKeys? ,  parent?){

  let _parent = this ;

  this.title = option.title || '---';

  this.key = option.key || null;

  this.parentNode = parent;

  // this.isSelected = (selectKeys && selectKeys.indexOf(option.key) ) > -1 ? true : false ;
  this.children = [];

  if (typeof (option.children) !== 'undefined' && option.children !== null) {
    option.children.forEach(function (nodeOptions) {
      _parent.children.push(new Tree(nodeOptions , selectKeys , _parent ));
    });
  };
};
