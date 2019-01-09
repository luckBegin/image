import {Injectable, EventEmitter, OnInit} from "@angular/core";
import { API } from '../API';
import { ObjToQuery } from '../ObjToQuery' ;
import { HttpClient ,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PUT } from '../../../decorators/request.decorator';

@Injectable({providedIn : 'root'})
export class StaffService{

  constructor(
    private http : HttpClient
  ){}

  getList(obj : Object){
    // const url = API.system.staff ;
    //
    // const para = ObjToQuery(obj) ;
    //
    // return this.http.get(url , {
    //   params : para
    // });
    return new Observable( obsr => {
      setTimeout( () => {
        obsr.next({"code":0,"success":true,"data":[{"id":3,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"username":"admin","description":"系统管理员","phoneNumber":"123","idNumber":"","address":"杭州市西湖区","headPortraitUrl":"","enabled":true,"status":null,"departmentDTOS":[{"id":6,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"parentId":null,"name":"开发","description":null,"enabled":null,"children":null},{"id":8,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"parentId":null,"name":"开发2","description":null,"enabled":null,"children":null}],"roleOutputVOS":[{"id":3,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"name":"admin","description":null,"enabled":null,"menuDTOS":null}]},{"id":4,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"username":"test","description":"21312","phoneNumber":"3123123","idNumber":null,"address":null,"headPortraitUrl":null,"enabled":true,"status":null,"departmentDTOS":[],"roleOutputVOS":[{"id":3,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"name":"admin","description":null,"enabled":null,"menuDTOS":null}]},{"id":5,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"username":"信审专员B","description":"NIUHAIXING","phoneNumber":"15638779080","idNumber":null,"address":null,"headPortraitUrl":null,"enabled":false,"status":null,"departmentDTOS":[{"id":9,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"parentId":null,"name":"开发3","description":null,"enabled":null,"children":null}],"roleOutputVOS":[{"id":13,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"name":"信审专员","description":null,"enabled":null,"menuDTOS":null}]},{"id":8,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"username":"信审专员C","description":"Aniu","phoneNumber":"1530168156362","idNumber":null,"address":null,"headPortraitUrl":null,"enabled":false,"status":null,"departmentDTOS":[{"id":11,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"parentId":null,"name":"开发5","description":null,"enabled":null,"children":null}],"roleOutputVOS":[{"id":13,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"name":"信审专员","description":null,"enabled":null,"menuDTOS":null}]},{"id":6,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"username":"leader","description":"456456","phoneNumber":"18221523625","idNumber":null,"address":null,"headPortraitUrl":null,"enabled":false,"status":null,"departmentDTOS":[{"id":8,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"parentId":null,"name":"开发2","description":null,"enabled":null,"children":null}],"roleOutputVOS":[{"id":14,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"name":"信审管理","description":null,"enabled":null,"menuDTOS":null}]},{"id":7,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"username":"信审专员D","description":"ZHANGSHANG","phoneNumber":"54354354","idNumber":null,"address":null,"headPortraitUrl":null,"enabled":false,"status":null,"departmentDTOS":[{"id":11,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"parentId":null,"name":"开发5","description":null,"enabled":null,"children":null}],"roleOutputVOS":[{"id":13,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"name":"信审专员","description":null,"enabled":null,"menuDTOS":null}]},{"id":15,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"username":"testhb","description":"xinshen2","phoneNumber":"123","idNumber":null,"address":null,"headPortraitUrl":null,"enabled":true,"status":null,"departmentDTOS":[{"id":11,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"parentId":null,"name":"开发5","description":null,"enabled":null,"children":null}],"roleOutputVOS":[{"id":13,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"name":"信审专员","description":null,"enabled":null,"menuDTOS":null}]},{"id":14,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"username":"信审专员A","description":"xinshen1","phoneNumber":"54325543","idNumber":null,"address":null,"headPortraitUrl":null,"enabled":true,"status":null,"departmentDTOS":[{"id":11,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"parentId":null,"name":"开发5","description":null,"enabled":null,"children":null}],"roleOutputVOS":[{"id":13,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"name":"信审专员","description":null,"enabled":null,"menuDTOS":null}]},{"id":17,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"username":"testtest","description":"sdf","phoneNumber":"12312","idNumber":null,"address":null,"headPortraitUrl":null,"enabled":true,"status":null,"departmentDTOS":[{"id":6,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"parentId":null,"name":"开发","description":null,"enabled":null,"children":null}],"roleOutputVOS":[{"id":3,"createTime":null,"modifyTime":null,"createOperatorId":null,"modifyOperatorId":null,"modifyOperatorName":null,"name":"admin","description":null,"enabled":null,"menuDTOS":null}]}],"message":null,"page":{"totalNumber":22,"currentPage":1,"totalPage":3,"pageSize":10,"dbIndex":0,"dbNumber":10,"isPaging":true}})
      } , 2000 )
    })
  };

  @PUT(API.system.staff)
  put(data: object){};

  post(data: object){
    const url = API.system.staff ;

    const header = new HttpHeaders()
      .set("Content-type" , "application/json") ;

    return this.http.post(url , data , {
      headers : header
    })
  };
  delete( data : any ){
    console.log(data) ;
    const url = API.system.staff + "/" + data.id ;
    return this.http.delete(url) ;
  };

  getStaffById(id:number){
    const url = API.system.staff + "/" + id ;
    return this.http.get(url) ;
  };

};
