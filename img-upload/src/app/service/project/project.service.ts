import {Injectable } from "@angular/core";
import { API } from '../API';
import { HttpClient } from '@angular/common/http';
import { DELETE, GET, POST, PUT } from '../../../decorators/request.decorator';
import { MsgService } from '..';

@Injectable({providedIn : 'root'})
export class ProjectService {

  constructor(
    private http: HttpClient ,
    private msg : MsgService
  ) {
  }

  @GET(API.project.config )
  get(data: any): any {} ;


  @POST(API.project.config)
  post(data : any) : any {} ;


  @PUT(API.project.config)
  put( data : any ) : any {} ;

  @GET(API.project.config + '/enum')
  eunm() : any {};

  @DELETE(API.project.config)
  delete() : any {};
}
