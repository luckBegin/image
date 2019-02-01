import { Component, OnInit, ViewChild } from '@angular/core';
import { MsgService } from '../../../service/msg/msg.service';
import { StaffService } from '../../../service/system/staff.service';
import { QueryModel } from './query.model';
import { ENUM, RESPONSE } from '../../../models';
import { AdaptorUtils , ObjectUtils } from '@shared/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from '../../../../decorators/service.decorator';
import { DepartService, RoleService  , SysMenuService} from '../../../service/system';
import { NzTreeComponent } from 'ng-zorro-antd';
import { Before, CombineAll } from '../../../../decorators/function.decorator';
import { Observable } from 'rxjs';

@Component({
  selector: 'sys-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.less'],
})
export class StaffComponent implements OnInit {
  constructor(
    private msg: MsgService,
    private service: StaffService,
    private menu: SysMenuService,
    private departSer: DepartService,
    private roleSer: RoleService,
    private fb: FormBuilder,
  ) {
  } ;

  ngOnInit(): void {
    this.getRoleList();
    this.getDeaprt();
  };

  isVisible: boolean = false;
  queryModel: QueryModel = new QueryModel;
  editMark: boolean = false;
  formShow: boolean = false;
  form: FormGroup = this.fb.group({
    'username': [null, [Validators.required]],
    'description': [null, [Validators.required]],
    'phoneNumber': [null],
    'password': [null],
    'roleIds': [null, [Validators.required]],
    'id': [null],
  });

  roles: ENUM[] = [];

  departs: any[] = [];
  selectDeaprt: string[];
  @ViewChild('treeCom') treeCom: NzTreeComponent;

  tableData = {
    loading: true,
    page: 1,
    columns: [{ title: '用户名', type: 'text', reflect: 'username' },
      { title: '手机号', type: 'text', reflect: 'phoneNumber' },
      { title: '真实姓名', type: 'text', reflect: 'description' },
      {
        title: '所属部门', type: 'text', reflect: 'departmentNames', filter: item => {
          let str = '';
          item.departmentDTOS.forEach(item => {
            str += item.name + ',';
          });
          return str;
        },
      },
      {
        title: '所属角色', type: 'text', reflect: 'roleNames', filter: item => {
          let str = '';
          item.roleOutputVOS.forEach(item => {
            str += item.name;
          });
          return str;
        },
      }],
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
            this.editMark = true;
            this.editShow(data);
          },
        },
      ],
    },
  };

  searchBarData = {
    conditions: [
      { name: '用户名', type: 'input' , model : "username" , placeHolder: '请输入用户名'},
      { name: '手机号', type: 'input', model : "phoneNumber" , placeHolder: '请输入手机号'},
      { name: '真实姓名', type: 'input' , model : "description" , placeHolder: '请输入真实姓名' },
    ],
    notify : {
      query : ( data : QueryModel ) =>  { this.queryModel = ObjectUtils.extend(this.queryModel , data)  as QueryModel ; this.getStaffList() },
      reset : ( data : QueryModel ) => { this.queryModel = new QueryModel ; this.getStaffList() } ,
    }
  };

  pageChange($event) {
    ($event.type == 'size') && (this.queryModel.pageSize = $event.number);
    ($event.type == 'page') && (this.queryModel.currentPage = $event.number);
    this.getStaffList();
  };

  getStaffList() {
    this.service.getList(this.queryModel)
      .subscribe((res: RESPONSE) => {
        this.tableData.loading = false;
        this.tableData.data = res.data;
      });
  };

  add() {
    this.editMark = false;
    this.formShow = true;
    this.form.reset();
  };

  @Service('service.delete', true, () => this.form.value )
  modalConfirm($event: Event) {
    this.msg.success('删除成功');
    this.isVisible = false;
    this.getStaffList();
  };

  @Before(function($event: Event) {
    const selectKeys = this.treeCom.nzTreeService.getCheckedNodeList();
    console.log(this.form);

    if (selectKeys.length === 0) {
      this.msg.warn('未选择部门');
      return;
    }
    ;

    if (!this.form.value.password) {
      this.msg.warn('未设置初始密码');
      return;
    }
    ;

    return new Observable(obsr => {
      const _arr = [];

      selectId(selectKeys, _arr);

      obsr.next(_arr);
    });
  })
  @CombineAll()
  makeNew($event: Event, selectKeys: string[]): void {
    const value = this.form.value;
    value['departmentIds '] = selectKeys;
    this.service.post(value)
      .subscribe((res: RESPONSE) => {
        this.msg.notifySuccess('新建员工成功', `用户名为: ${value.username} , 密码:${value.password}`);
        this.formShow = false;
      });
  };

  @Before(function($event: Event) {
    const selectKeys = this.treeCom.nzTreeService.getCheckedNodeList();
    console.log(this.form);

    if (selectKeys.length === 0) {
      this.msg.warn('未选择部门');
      return;
    };

    return new Observable(obsr => {
      const _arr = [];

      selectId(selectKeys, _arr);

      obsr.next(_arr);
    });
  })
  @CombineAll()
  save($event: Event, selectKeys: string[]): void {
    const value = this.form.value;
    value['departmentIds '] = selectKeys;
    this.service.post(value)
      .subscribe((res: RESPONSE) => {
        this.msg.success('修改成功');
        this.formShow = false;
      });
  };

  getRoleList(): void {
    this.roleSer.getList({})
      .subscribe((res: RESPONSE) => {
        res.data.forEach(item => {
          this.roles.push({
            key: item.name,
            value: item.id,
          });
        });
      });
  };

  getDeaprt(): void {
    this.departSer.get()
      .subscribe((res: RESPONSE) => {
        this.departs = AdaptorUtils.makeTreeNode({ title: 'name', key: 'id' }, res.data);
      });
  };

  editShow(data: any) {

    let roles = [];

    let departs = [];

    data.roleOutputVOS.forEach(item => {
      roles.push(item.name);
    });

    data.departmentDTOS.forEach(item => {
      departs.push(item.id);
    });

    data.roleIds = roles;

    this.selectDeaprt = departs;

    this.form.patchValue(data);

    this.formShow = true;
  };
};

const selectId = function(arr: any[], tar: string[]) {
  arr.forEach(item => {
    tar.push(item.key.toString());
    if (item.children.length > 0) {
      selectId(item.children, tar);
    }
  });
};
