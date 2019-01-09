import { Component, OnInit } from '@angular/core';
import { MsgService } from '../../../service';
import { ActivatedRoute } from '@angular/router';
import { DateUtils, ObjectUtils } from '@shared/utils';
import { QueryModel } from './query.mode';
import { ListService } from '../../../service/project/list.service';
import { Observable } from 'rxjs';
import { ENUM, RESPONSE } from '../../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from '../../../../decorators/service.decorator';
import { el } from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector : "project-list",
  templateUrl : './list.component.html' ,
  styleUrls : ['./list.component.less']
})
export class ListCompnent implements  OnInit{
  constructor(
    private msg :MsgService ,
    private router : ActivatedRoute ,
    private service : ListService ,
    private fb : FormBuilder
  ){} ;

  ngOnInit(): void {
    this.projectId = this.router.snapshot.params['id'] ;
    this.getList() ;
  };

  projectId : number ;

  queryModel : QueryModel = new QueryModel ;

  formShow : boolean = false ;

  editMark : boolean = false ;

  isVisible : boolean = false ;

  form : FormGroup = this.fb.group({
    id : [null] ,
    name : [null ] ,
    projectId : [null] ,
    classifyId : [null]
  });

  src : string ;
  imgShow : boolean = false ;
  tableData = {
    loading: true,
    page: 1,
    total : 0 ,
    columns: [
      { title: '名称', type: 'text', reflect: 'name'  , filter : item => item.name ? item.name : "无"},
      { title: '地址', type: 'text', reflect: 'path'},
      { title: '图片', type: 'img', reflect: 'path' , fn : item => {
        this.src = item.path ;
        this.imgShow = true ;
      }},
      { title: '类别', type: 'text', reflect: 'classifyId' , filter : ( item ) => {
        if(item.classifyId){
        }else {
          return "无" ;
        }
      }},
      { title: '创建时间', type: 'text', reflect: 'createTime' , filter : (item) => {
          return DateUtils.format(item.createTime , 'y-m-d') ;
      }},
    ],
    data: [],
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
      { name: '名称', type: 'input' , model : "name" , placeHolder: '请输入名称'},
    ],
    notify : {
      query : ( data : QueryModel ) =>  { this.queryModel = ObjectUtils.extend(this.queryModel , data)  as QueryModel ; this.getList();  },
      reset : ( data : QueryModel ) => { this.queryModel = new QueryModel ; this.getList(); } ,
    }
  };

  getList(){
    this.queryModel.projectId = this.projectId ;
    (this.service.get(this.queryModel) as Observable< RESPONSE >)
      .subscribe( ( res : RESPONSE) => {

        this.tableData.loading = false ;

        this.tableData.data =res.data ;

        if(res.page)
          this.tableData.total = res.page.totalNumber ;

      } ,err => {
        this.tableData.loading = false ;
      })
  };

  add(){
    this.editMark = false ;
    this.formShow = true ;
    this.form.reset() ;
    this.form.patchValue({
      projectId : this.projectId
    });
  };

  makeNew($event){

    const data = this.form.value ;

    const file = < HTMLInputElement >document.querySelector("#image") ;

    let imgFile = file.files[0] ;

    const button = $event.target as HTMLButtonElement ;

    button.disabled = true  ;
    if(!/.(png|.jpg|.jpeg)$/g.test(imgFile.name)){
      this.msg.warn("请选择png, jpg ,jpeg的图片文件");
      $event.disabled = false ;
    };
    const formData : FormData = ObjectUtils.toFormData(data) ;
    formData.append("img" , imgFile) ;

    (this.service.imgUpload(formData) as Observable<any>)
      .subscribe( ( res : RESPONSE ) => {

        data.path = res.data.path ;

        ( this.service.post(data) as Observable<any>)
          .subscribe( ( res : RESPONSE ) => {
            button.disabled = false ;
            this.msg.notifySuccess("上传成功 , 地址为 : " , data.path ) ;
            this.formShow = false ;
            this.getList() ;
          } , err => {
            button.disabled = false ;
          });
      }, err => {
        button.disabled = false ;
        this.msg.error("上传失败,原因:" + err )
      })
  };

  @Service("service.put" , true ,function(){
    const data = this.form.value ;
    data.projectId = this.projectId ;
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
