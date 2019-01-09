export const ObjectUtils = {
  extend : ( target : Object , source : Object , cover : boolean = false ) : object => {

    Object.keys( source).forEach( key => {
      if(cover && target[key])
        target[key] = source[key]

      if(!cover)
        target[key] = source[key] ;
    });

    return target ;
  },

  toFormData : ( target : object ) : FormData =>{
    const form = new FormData() ;

    Object.keys(target).forEach( key => {
      if(target[key])
        form.append(key , target[key]) ;
    });
    return new FormData() ;
  }
};
