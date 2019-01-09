import { Component, OnInit } from '@angular/core';
import { MsgService } from '../../../service';
import { QueryModel } from './query.mode';
import { DateUtils, ObjectUtils } from '@shared/utils';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { ngIfAnimation } from '../../../routes/router-animation';
import { Service } from '../../../../decorators/service.decorator';
import { ProjectService } from '../../../service/project';
import { Observable } from 'rxjs';
import { RESPONSE } from '../../../models';
import { validate } from 'codelyzer/walkerFactory/walkerFn';
@Component({
  selector : 'product-config' ,
  templateUrl : './config.component.html' ,
  styleUrls : ['./config.component.less'] ,
  animations : [ ngIfAnimation ]
})
export class ConfigComponent implements OnInit{
  constructor(
    private msg :MsgService ,
    private fb : FormBuilder ,
    private service : ProjectService
  ){};

  ngOnInit(): void {
    this.getList();

  };
  queryModel : QueryModel = new QueryModel ;

  formShow :boolean = false ;

  editMark : boolean = false ;

  isVisible : boolean = false ;

  form : FormGroup = this.fb.group({
    name : [null , [Validators.required]] ,
    remark : [null , [Validators.required]] ,
    id : [null]
  });
  tableData = {
    loading: true,
    page: 1,
    total : 0 ,
    columns: [
      { title: '项目编号', type: 'text', reflect: 'id' },
      { title: '项目名称', type: 'text', reflect: 'name' },
      { title: '备注', type: 'text', reflect: 'remark' },
      { title: '创建时间', type: 'text', reflect: 'createTime' , filter : (item) => {
        return DateUtils.format(item.createTime , 'y-m-d') ;
      }},
    ],
    data: [],
    btn: {
      title: '操作',
      items: [{
          type: 'edit',
          title: '编辑',
          fn: (data) => {
            this.formShow = true ;
            this.editMark = true ;
            this.form.patchValue(data) ;
          },
        },{
        type: 'del',
        title: '删除',
        fn: (data) => {
          this.isVisible = true ;
          this.form.patchValue(data) ;
        },
      },
      ],
    },
    change : (type : string , size : number ) => {
      if(type === 'size')
        this.queryModel.pageSize = size ;
      if(type === 'page')
        this.queryModel.currentPage = size ;
      this.getList() ;
    }
  };

  searchBarData = {
    conditions: [
      { name: '项目名称', type: 'number' , model : "name" , placeHolder: '请输入项目名称'},
    ],
    notify : {
      query : ( data : QueryModel ) =>  { this.queryModel = ObjectUtils.extend(this.queryModel , data)  as QueryModel ; this.getList();  },
      reset : ( data : QueryModel ) => { this.queryModel = new QueryModel ; this.getList(); } ,
    }
  };

  getList() : void{
    this.tableData.loading = true ;
    (< Observable<any> >this.service.get(this.queryModel))
      .subscribe( (res : RESPONSE) => {
        this.tableData.loading = false ;
        this.tableData.data = res.data ;

        if(res.page)
          this.tableData.total = res.page.totalNumber ;

      } , err => {
        this.tableData.loading = false ;
      })
  };

  add(){
    this.formShow = true ;
    this.editMark = false ;
    this.form.reset() ;
  };

  @Service("service.post" , true ,function(){
    const data = this.form.value ;
    return data ;
  })
  makeNew($event){
    this.msg.success("添加成功") ;
    this.formShow = false ;
    this.getList() ;
  };

  @Service("service.put" , true ,function(){
    const data = this.form.value ;
    return data ;
  })
  save($event){
    this.msg.success("保存成功");
    this.formShow = false ;
    this.getList() ;
  };

  @Service('service.delete' , true , function(){
    return this.form.value ;
  })
  modalConfirm($event){
    this.msg.success("删除成功") ;
    this.isVisible = false ;
    this.getList();
  };
}
