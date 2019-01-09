import {Injectable } from "@angular/core";
import { API } from '../API';
import { HttpClient } from '@angular/common/http';
import { DELETE, GET, POST, PUT } from '../../../decorators/request.decorator';
import { MsgService } from '..';

@Injectable({providedIn : 'root'})
export class ClassifyService {

  constructor(
    private http: HttpClient ,
    private msg : MsgService
  ) {
  }

  @GET(API.project.classify )
  get(data: any): any {} ;


  @POST(API.project.classify)
  post(data : any) : any {} ;


  @PUT(API.project.classify)
  put( data : any ) : any {} ;

  @DELETE(API.project.classify)
  delete( data : any ) : any {} ;
}
