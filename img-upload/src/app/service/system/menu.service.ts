import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../API';
import { Observable } from 'rxjs';
import { POST } from '../../../decorators/request.decorator';
import { MsgService } from '../msg/msg.service';
@Injectable({ providedIn: 'root' })
export class SysMenuService {
  constructor(
    private http: HttpClient,
    private msg : MsgService
  ){}

  getLoginMenu(usrId: Number) {
    const url = API.system.getLoginMenu ;
    return this.http.get(url) ;
    // return new Observable(obsr => {
    //   obsr.next({
    //     "code":0,
    //     "success":true,
    //     "data":[
    //       {
    //         "id":11,
    //         "createTime":1530189316000,
    //         "modifyTime":1530196529000,
    //         "createOperatorId":null,
    //         "modifyOperatorId":3,
    //         "modifyOperatorName":null,
    //         "parentId":null,
    //         "url":"/system",
    //         "isButton":0,
    //         "buttonKey":null,
    //         "iconPath":"anticon anticon-bars",
    //         "enabled":1,
    //         "menuDescriptions":[
    //           {
    //             "id":269,
    //             "createTime":1535957388000,
    //             "modifyTime":null,
    //             "createOperatorId":3,
    //             "modifyOperatorId":null,
    //             "modifyOperatorName":null,
    //             "menuId":11,
    //             "locale":"zh_CN",
    //             "description":"系统设置",
    //             "enabled":1
    //           }
    //         ],
    //         "children":[
    //           {
    //             "id":12,
    //             "createTime":1530190858000,
    //             "modifyTime":1530195799000,
    //             "createOperatorId":null,
    //             "modifyOperatorId":3,
    //             "modifyOperatorName":null,
    //             "parentId":11,
    //             "url":"/system/menu",
    //             "isButton":0,
    //             "buttonKey":null,
    //             "iconPath":"anticon anticon-bars",
    //             "enabled":1,
    //             "menuDescriptions":[
    //               {
    //                 "id":411,
    //                 "createTime":1544572915000,
    //                 "modifyTime":null,
    //                 "createOperatorId":3,
    //                 "modifyOperatorId":null,
    //                 "modifyOperatorName":null,
    //                 "menuId":12,
    //                 "locale":"zh_CN",
    //                 "description":"菜单设置",
    //                 "enabled":1
    //               }
    //             ],
    //             "children":[
    //               {
    //                 "id":88,
    //                 "createTime":1544616084000,
    //                 "modifyTime":1544616893000,
    //                 "createOperatorId":3,
    //                 "modifyOperatorId":3,
    //                 "modifyOperatorName":null,
    //                 "parentId":12,
    //                 "url":"新增菜单",
    //                 "isButton":1,
    //                 "buttonKey":null,
    //                 "iconPath":"anticon anticon-bars",
    //                 "enabled":1,
    //                 "menuDescriptions":[
    //                   {
    //                     "id":623,
    //                     "createTime":1544878721000,
    //                     "modifyTime":null,
    //                     "createOperatorId":3,
    //                     "modifyOperatorId":null,
    //                     "modifyOperatorName":null,
    //                     "menuId":88,
    //                     "locale":"zh_CN",
    //                     "description":"新增菜单",
    //                     "enabled":1
    //                   }
    //                 ],
    //                 "children":[
    //
    //                 ],
    //                 "controllerIds":null,
    //                 "isAuth":null
    //               },
    //               {
    //                 "id":89,
    //                 "createTime":1544616097000,
    //                 "modifyTime":1544616899000,
    //                 "createOperatorId":3,
    //                 "modifyOperatorId":3,
    //                 "modifyOperatorName":null,
    //                 "parentId":12,
    //                 "url":"编辑菜单",
    //                 "isButton":1,
    //                 "buttonKey":null,
    //                 "iconPath":"anticon anticon-bars",
    //                 "enabled":1,
    //                 "menuDescriptions":[
    //                   {
    //                     "id":625,
    //                     "createTime":1544878727000,
    //                     "modifyTime":null,
    //                     "createOperatorId":3,
    //                     "modifyOperatorId":null,
    //                     "modifyOperatorName":null,
    //                     "menuId":89,
    //                     "locale":"zh_CN",
    //                     "description":"编辑菜单",
    //                     "enabled":1
    //                   }
    //                 ],
    //                 "children":[
    //
    //                 ],
    //                 "controllerIds":null,
    //                 "isAuth":null
    //               }
    //             ],
    //             "controllerIds":null,
    //             "isAuth":null
    //           },
    //           {
    //             "id":15,
    //             "createTime":1530196346000,
    //             "modifyTime":1534182208000,
    //             "createOperatorId":3,
    //             "modifyOperatorId":3,
    //             "modifyOperatorName":null,
    //             "parentId":11,
    //             "url":"/system/staff",
    //             "isButton":0,
    //             "buttonKey":null,
    //             "iconPath":"anticon anticon-bars",
    //             "enabled":1,
    //             "menuDescriptions":[
    //               {
    //                 "id":273,
    //                 "createTime":1535957516000,
    //                 "modifyTime":null,
    //                 "createOperatorId":3,
    //                 "modifyOperatorId":null,
    //                 "modifyOperatorName":null,
    //                 "menuId":15,
    //                 "locale":"zh_CN",
    //                 "description":"账号设置",
    //                 "enabled":1
    //               }
    //             ],
    //             "children":[
    //               {
    //                 "id":96,
    //                 "createTime":1544616265000,
    //                 "modifyTime":1544616903000,
    //                 "createOperatorId":3,
    //                 "modifyOperatorId":3,
    //                 "modifyOperatorName":null,
    //                 "parentId":15,
    //                 "url":"新增管理员",
    //                 "isButton":1,
    //                 "buttonKey":null,
    //                 "iconPath":"anticon anticon-bars",
    //                 "enabled":1,
    //                 "menuDescriptions":[
    //                   {
    //                     "id":627,
    //                     "createTime":1544878739000,
    //                     "modifyTime":null,
    //                     "createOperatorId":3,
    //                     "modifyOperatorId":null,
    //                     "modifyOperatorName":null,
    //                     "menuId":96,
    //                     "locale":"zh_CN",
    //                     "description":"新增管理员",
    //                     "enabled":1
    //                   }
    //                 ],
    //                 "children":[
    //
    //                 ],
    //                 "controllerIds":null,
    //                 "isAuth":null
    //               },
    //               {
    //                 "id":97,
    //                 "createTime":1544616281000,
    //                 "modifyTime":1544616907000,
    //                 "createOperatorId":3,
    //                 "modifyOperatorId":3,
    //                 "modifyOperatorName":null,
    //                 "parentId":15,
    //                 "url":"编辑管理员",
    //                 "isButton":1,
    //                 "buttonKey":null,
    //                 "iconPath":"anticon anticon-bars",
    //                 "enabled":1,
    //                 "menuDescriptions":[
    //                   {
    //                     "id":629,
    //                     "createTime":1544878746000,
    //                     "modifyTime":null,
    //                     "createOperatorId":3,
    //                     "modifyOperatorId":null,
    //                     "modifyOperatorName":null,
    //                     "menuId":97,
    //                     "locale":"zh_CN",
    //                     "description":"编辑管理员",
    //                     "enabled":1
    //                   }
    //                 ],
    //                 "children":[
    //
    //                 ],
    //                 "controllerIds":null,
    //                 "isAuth":null
    //               },
    //               {
    //                 "id":122,
    //                 "createTime":1544652514000,
    //                 "modifyTime":1544879201000,
    //                 "createOperatorId":3,
    //                 "modifyOperatorId":3,
    //                 "modifyOperatorName":null,
    //                 "parentId":15,
    //                 "url":"删除管理员",
    //                 "isButton":1,
    //                 "buttonKey":null,
    //                 "iconPath":"anticon anticon-bars",
    //                 "enabled":1,
    //                 "menuDescriptions":[
    //                   {
    //                     "id":699,
    //                     "createTime":1544879201000,
    //                     "modifyTime":null,
    //                     "createOperatorId":3,
    //                     "modifyOperatorId":null,
    //                     "modifyOperatorName":null,
    //                     "menuId":122,
    //                     "locale":"zh_CN",
    //                     "description":"删除管理员",
    //                     "enabled":1
    //                   }
    //                 ],
    //                 "children":[
    //
    //                 ],
    //                 "controllerIds":null,
    //                 "isAuth":null
    //               }
    //             ],
    //             "controllerIds":null,
    //             "isAuth":null
    //           },
    //           {
    //             "id":16,
    //             "createTime":1530196374000,
    //             "modifyTime":1534181212000,
    //             "createOperatorId":3,
    //             "modifyOperatorId":3,
    //             "modifyOperatorName":null,
    //             "parentId":11,
    //             "url":"/system/role",
    //             "isButton":0,
    //             "buttonKey":null,
    //             "iconPath":"anticon anticon-bars",
    //             "enabled":1,
    //             "menuDescriptions":[
    //               {
    //                 "id":275,
    //                 "createTime":1535957529000,
    //                 "modifyTime":null,
    //                 "createOperatorId":3,
    //                 "modifyOperatorId":null,
    //                 "modifyOperatorName":null,
    //                 "menuId":16,
    //                 "locale":"zh_CN",
    //                 "description":"角色设置",
    //                 "enabled":1
    //               }
    //             ],
    //             "children":[
    //               {
    //                 "id":94,
    //                 "createTime":1544616237000,
    //                 "modifyTime":1544616912000,
    //                 "createOperatorId":3,
    //                 "modifyOperatorId":3,
    //                 "modifyOperatorName":null,
    //                 "parentId":16,
    //                 "url":"新增角色",
    //                 "isButton":1,
    //                 "buttonKey":null,
    //                 "iconPath":"anticon anticon-bars",
    //                 "enabled":1,
    //                 "menuDescriptions":[
    //                   {
    //                     "id":631,
    //                     "createTime":1544878753000,
    //                     "modifyTime":null,
    //                     "createOperatorId":3,
    //                     "modifyOperatorId":null,
    //                     "modifyOperatorName":null,
    //                     "menuId":94,
    //                     "locale":"zh_CN",
    //                     "description":"新增角色",
    //                     "enabled":1
    //                   }
    //                 ],
    //                 "children":[
    //
    //                 ],
    //                 "controllerIds":null,
    //                 "isAuth":null
    //               },
    //               {
    //                 "id":95,
    //                 "createTime":1544616248000,
    //                 "modifyTime":1544616917000,
    //                 "createOperatorId":3,
    //                 "modifyOperatorId":3,
    //                 "modifyOperatorName":null,
    //                 "parentId":16,
    //                 "url":"编辑角色",
    //                 "isButton":1,
    //                 "buttonKey":null,
    //                 "iconPath":"anticon anticon-bars",
    //                 "enabled":1,
    //                 "menuDescriptions":[
    //                   {
    //                     "id":633,
    //                     "createTime":1544878761000,
    //                     "modifyTime":null,
    //                     "createOperatorId":3,
    //                     "modifyOperatorId":null,
    //                     "modifyOperatorName":null,
    //                     "menuId":95,
    //                     "locale":"zh_CN",
    //                     "description":"编辑角色",
    //                     "enabled":1
    //                   }
    //                 ],
    //                 "children":[
    //
    //                 ],
    //                 "controllerIds":null,
    //                 "isAuth":null
    //               },
    //               {
    //                 "id":123,
    //                 "createTime":1544652531000,
    //                 "modifyTime":1544879209000,
    //                 "createOperatorId":3,
    //                 "modifyOperatorId":3,
    //                 "modifyOperatorName":null,
    //                 "parentId":16,
    //                 "url":"删除角色",
    //                 "isButton":1,
    //                 "buttonKey":null,
    //                 "iconPath":"anticon anticon-bars",
    //                 "enabled":1,
    //                 "menuDescriptions":[
    //                   {
    //                     "id":701,
    //                     "createTime":1544879209000,
    //                     "modifyTime":null,
    //                     "createOperatorId":3,
    //                     "modifyOperatorId":null,
    //                     "modifyOperatorName":null,
    //                     "menuId":123,
    //                     "locale":"zh_CN",
    //                     "description":"删除角色",
    //                     "enabled":1
    //                   }
    //                 ],
    //                 "children":[
    //
    //                 ],
    //                 "controllerIds":null,
    //                 "isAuth":null
    //               }
    //             ],
    //             "controllerIds":null,
    //             "isAuth":null
    //           },
    //           {
    //             "id":17,
    //             "createTime":1530196390000,
    //             "modifyTime":1534193867000,
    //             "createOperatorId":3,
    //             "modifyOperatorId":3,
    //             "modifyOperatorName":null,
    //             "parentId":11,
    //             "url":"/system/depart",
    //             "isButton":0,
    //             "buttonKey":null,
    //             "iconPath":"anticon anticon-bars",
    //             "enabled":1,
    //             "menuDescriptions":[
    //               {
    //                 "id":277,
    //                 "createTime":1535957547000,
    //                 "modifyTime":null,
    //                 "createOperatorId":3,
    //                 "modifyOperatorId":null,
    //                 "modifyOperatorName":null,
    //                 "menuId":17,
    //                 "locale":"zh_CN",
    //                 "description":"部门设置",
    //                 "enabled":1
    //               }
    //             ],
    //             "children":[
    //               {
    //                 "id":91,
    //                 "createTime":1544616147000,
    //                 "modifyTime":1544616922000,
    //                 "createOperatorId":3,
    //                 "modifyOperatorId":3,
    //                 "modifyOperatorName":null,
    //                 "parentId":17,
    //                 "url":"编辑部门",
    //                 "isButton":1,
    //                 "buttonKey":null,
    //                 "iconPath":"anticon anticon-bars",
    //                 "enabled":1,
    //                 "menuDescriptions":[
    //                   {
    //                     "id":635,
    //                     "createTime":1544878767000,
    //                     "modifyTime":null,
    //                     "createOperatorId":3,
    //                     "modifyOperatorId":null,
    //                     "modifyOperatorName":null,
    //                     "menuId":91,
    //                     "locale":"zh_CN",
    //                     "description":"编辑部门",
    //                     "enabled":1
    //                   }
    //                 ],
    //                 "children":[
    //
    //                 ],
    //                 "controllerIds":null,
    //                 "isAuth":null
    //               },
    //               {
    //                 "id":121,
    //                 "createTime":1544652390000,
    //                 "modifyTime":1544879189000,
    //                 "createOperatorId":3,
    //                 "modifyOperatorId":3,
    //                 "modifyOperatorName":null,
    //                 "parentId":17,
    //                 "url":"新增部门",
    //                 "isButton":1,
    //                 "buttonKey":null,
    //                 "iconPath":"anticon anticon-bars",
    //                 "enabled":1,
    //                 "menuDescriptions":[
    //                   {
    //                     "id":697,
    //                     "createTime":1544879189000,
    //                     "modifyTime":null,
    //                     "createOperatorId":3,
    //                     "modifyOperatorId":null,
    //                     "modifyOperatorName":null,
    //                     "menuId":121,
    //                     "locale":"zh_CN",
    //                     "description":"新增部门",
    //                     "enabled":1
    //                   }
    //                 ],
    //                 "children":[
    //
    //                 ],
    //                 "controllerIds":null,
    //                 "isAuth":null
    //               },
    //               {
    //                 "id":124,
    //                 "createTime":1544652544000,
    //                 "modifyTime":1544879218000,
    //                 "createOperatorId":3,
    //                 "modifyOperatorId":3,
    //                 "modifyOperatorName":null,
    //                 "parentId":17,
    //                 "url":"删除部门",
    //                 "isButton":1,
    //                 "buttonKey":null,
    //                 "iconPath":"anticon anticon-bars",
    //                 "enabled":1,
    //                 "menuDescriptions":[
    //                   {
    //                     "id":703,
    //                     "createTime":1544879218000,
    //                     "modifyTime":null,
    //                     "createOperatorId":3,
    //                     "modifyOperatorId":null,
    //                     "modifyOperatorName":null,
    //                     "menuId":124,
    //                     "locale":"zh_CN",
    //                     "description":"删除部门",
    //                     "enabled":1
    //                   }
    //                 ],
    //                 "children":[
    //
    //                 ],
    //                 "controllerIds":null,
    //                 "isAuth":null
    //               }
    //             ],
    //             "controllerIds":null,
    //             "isAuth":null
    //           }
    //         ],
    //         "controllerIds":null,
    //         "isAuth":null
    //       }
    //     ],
    //     "message":null,
    //     "page":null
    //   });
    // });
  };
  getAllmenu() {
    return new Observable() ;
  };

  post(data: object) {
    const url = API.system.menu;

    const header = new HttpHeaders()
      .set('Content-type', 'application/json');

    return this.http.post(url, data, {
      headers: header,
    });
  };

  delete(data: any) {
    const url = API.system.menu + '/' + data.id;
    return this.http.delete(url);
  };

  put(data: object) {
    const url = API.system.menu;

    const header = new HttpHeaders()
      .set('Content-type', 'application/json');

    return this.http.put(url, data, {
      headers: header,
    });
  };

  // @ts-ignore
  @POST(API.system.login)
  login(data: any){};
};
