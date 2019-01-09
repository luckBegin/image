import { Observable } from 'rxjs';
import { RESPONSE } from '../app/models';
import { filter} from 'rxjs/operators';

export function Service( serviceName : string , prevent : boolean ,  data : Function ){
  return function ( target : any, propertyKey : string, descriptor : PropertyDescriptor ){
    if(!/\w+.\w+/g.test(serviceName)){
      throw new Error("Invalid Service call ")
    };

    const raw = descriptor.value ;
    descriptor.value = function(...args){
      const $event = args[0] as Event ;
      const el = $event.target as HTMLButtonElement ;
        el.disabled = true ;

      const service = serviceName.split(".") ;

      let _data = data.call(this , args);

      if(_data === false)
        return ;

      ( < Observable <RESPONSE> >this[service[0]][service[1]](_data) )
        .subscribe( ( data : any ) => {
          raw.apply(this , args) ;
          el.disabled = false ;
        } , err => {
          el.disabled = false ;
          if(prevent === false){
            raw.apply(this , args) ;
          };
        });
    }
  };
};
