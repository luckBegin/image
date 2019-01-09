import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NzTreeNode, NzTdComponent } from 'ng-zorro-antd';
import { MsgService } from "../../../service/msg/msg.service";
import { FormBuilder, FormGroup , Validators} from "@angular/forms";
import { DepartService } from "../../../service/system";
import { RESPONSE } from '../../../models' ;
import { filter } from 'rxjs/operators';
import { AdaptorUtils } from '@shared/utils';
import { ngIfAnimation } from '../../../routes/router-animation';
import { Service } from '../../../../decorators/service.decorator';

@Component({
  selector : "sys-depart" ,
  templateUrl : "./depart.component.html",
  styleUrls : ['./depart.component.less'],
  animations: [ ngIfAnimation ]

})
export class DepartComponent implements OnInit{
  constructor(
    private msg : MsgService ,
    private fb : FormBuilder ,
    private service : DepartService ,
  ){} ;


  ngOnInit() : void{
    this.getList() ;
  };

  departList : any[] = [] ;

  hHeight = document.body.clientHeight - 204 ;

  mouseHeight : number = 30 ;

  loading : boolean = true ;

  menuShow : boolean = false ;

  infoBoxShow : boolean = false ;

  editMark : boolean = false ;

  validateForm : FormGroup = this.fb.group({
    "name" : [null , [Validators.required]] ,
    "description" : [null , [Validators.required]] ,
    "parentId" : [ 0 ] ,
    'id' : [ null ]
  });

  getList(){
    this.service.get()
      .subscribe( ( res : RESPONSE) => {
        this.departList = AdaptorUtils.makeTreeNode({title : 'name' , key : 'id' },res.data) ;
        this.loading = false ;
      });
  };

  showMenu($event){
    this.mouseHeight = $event.event.pageY - 70;
    this.menuShow = true ;
    this.currentItem = $event.node ;
  };

  add( isParent : boolean ){
    this.menuShow = false ;
    this.validateForm.reset() ;
    this.infoBoxShow = true ;
    this.editMark = false ;
    if(isParent)
      this.validateForm.patchValue({ id :  0 } ) ;
    else{
      const pid = this.currentItem.parentNode ? this.currentItem.key : 0 ;
      this.validateForm.patchValue({ parentId : pid } ) ;
    };
  };

  del(){
    this.menuShow = false ;
    this.isVisible = true ;

    this.validateForm.patchValue({ id : this.currentItem.key }) ;
  };

  edit(){
    this.menuShow = false ;
    this.infoBoxShow = true ;
    this.editMark = true ;
    this.validateForm.patchValue({
      id : this.currentItem.key ,
      name : this.currentItem.title ,
      description : this.currentItem.origin.description
    })
  };

  isVisible : boolean = false ;

  currentItem : any = {} ;

  @Service("service.delete" , true , () => this.validateForm.value )
  modalConfirm($event){
    this.msg.success("删除成功") ;
    this.isVisible = false ;
    this.getList() ;
  };

  @Service("service.post" , true , () => this.validateForm.value )
  makeNew($event : Event){
    this.msg.success("新建部门成功")
    this.infoBoxShow = false ;
    this.getList() ;
  };

  @Service("service.put" , true , () => this.validateForm.value )
  save($event){
    this.msg.success("部门修改成功") ;
    this.infoBoxShow = false ;
    this.getList() ;
  };
};
