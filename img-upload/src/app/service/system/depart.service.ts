import { Injectable } from '@angular/core' ;
import { HttpClient, HttpHeaders } from "@angular/common/http" ;
import { API } from '../API';
import { Observable } from 'rxjs';
@Injectable({providedIn : "root"})
export class DepartService {
  constructor(
    private http : HttpClient
  ){};

  get(){
    const url = API.system.depart.list ;
    // return this.http.get(url);

    return new Observable( obsr => {
      setTimeout( () => {
        obsr.next({
          success : true ,
          code :  1 ,
          data : [
            { id  : 6 , name : 111 , description : "123" , children  : [{ id  : 11_11 , name : 11_11 , description : "123" , children  : [] }] },
            { id  : 222 , name : 222 , description : "123" , children  : [{ id  : 22_22 , name : 22_22 , description : "123" , children  : [] }] },
            { id  : 333 , name : 333 , description : "123" , children  : [{ id  : 33_33 , name : 33_33 , description : "123" , children  : [] }] }
          ]
        })
      }  , 1000 ) ;
    });
  };

  post(departObj : object){
    const url = API.system.depart.opera ;
    let postData = departObj ;
    return this.http.post(url , postData);
  };

  put(departObj : object){
    const url = API.system.depart.opera ;

    const postData = departObj ;

    const header = new HttpHeaders()
      .set("Content-type" , "application/json");

    return this.http.put(url , postData , {
      headers : header
    });
  };

  delete( data : { id : number }){
    const url = API.system.depart.opera+ "/" + data.id ;
    return this.http.delete(url) ;
  }
};
