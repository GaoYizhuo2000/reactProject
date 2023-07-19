/**
 * global config file
 */
let baseURL; 
let imgUrl = '//nero777.com/img/';
if(process.env.NODE_ENV === 'development'){
  baseURL = '//api.nero777.com';
}else{
  baseURL = '//api.nero777.com';
}


export default {imgUrl, baseURL}