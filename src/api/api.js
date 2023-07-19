import Server from './server';

class API extends Server{
  /**
   *  for uploading images
   *  @url https://nero777.com/addimg/shop
   *  @method post
   *  @return {promise}
   */
  async uploadImg(params = {}){
    try{
      let result = await this.axios('post', '//nero777.com/addimg/shop', params);
      if(result && result.status === 1){
        return result;
      }else{
        let err = {
          tip: 'failed',
          response: result,
          data: params,
          url: '//nero777/addimg/shop',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

  /**
   *  for getting record data
   *  @url https://api.nero777.com/shopro/data/record
   *  @method get
   *  @return {promise}
   */
  async getRecord(params = {}){
    try{
      let result = await this.axios('get', `/shopro/data/record/${params.type}`); 
      if(result && (result.data instanceof Object) && result.http_code === 200){
        return result.data;
      }else{
        let err = {
          tip: 'failed to get record data',
          response: result,
          data: params,
          url: 'https://api.nero777.com/shopro/data/record',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

  /**
   *  for getting product data
   *  @url https://api.nero777.com/shopro/data/products
   *  @method get
   *  @return {promise}
   */
  async getProduction(params = {}){
    try{
      let result = await this.axios('get', '/shopro/data/products', params); 
      if(result && (result.data instanceof Object) && result.http_code === 200){
        return result.data.data||[];
      }else{
        let err = {
          tip: 'failed to get product data',
          response: result,
          data: params,
          url: 'https://api.nero777.com/shopro/data/products',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

  /**
   *  for getting commission data
   *  @url https://api.nero777.com/shopro/data/balance
   *  @method get
   *  @return {promise}
   */
  async getBalance(params = {}){
    try{
      let result = await this.axios('get', '/shopro/data/balance', params); 
      if(result && (result.data instanceof Object) && result.http_code === 200){
        return result.data.data||{};
      }else{
        let err = {
          tip: 'failed to get commission data',
          response: result,
          data: params,
          url: 'https://api.nero777.com/shopro/data/balance',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
}

export default new API();