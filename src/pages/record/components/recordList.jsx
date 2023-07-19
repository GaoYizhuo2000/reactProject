import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import API from '@/api/api';
import './recordList.less';

class RecordList extends Component{
  
  state = {
    recordData: [],
  }
  
  /**
   * 初始化获取数据
   * @param  {string} type 数据类型
   */
  getRecord = async type => {
    try{
      let result = await API.getRecord({type});
      this.setState({recordData: result.data||[]})
    }catch(err){
      console.error(err);
    }
  }

  componentWillReceiveProps(nextProps){
    // 判断类型是否重复
    let currenType = this.props.location.pathname.split('/')[2];
    let type = nextProps.location.pathname.split('/')[2];
    if(currenType !== type){
      this.getRecord(type);
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  componentWillMount(){
    let type = this.props.location.pathname.split('/')[2];
    this.getRecord(type);
  }

  render(){
    return (
      <div>
        <ul className="record-list-con">
        {
          this.state.recordData.map((item, index) => {
            return <li className="record-item" key={index}>
              <section className="record-item-header">
                <span>Created at：{item.created_at}</span>
                <span>{item.type_name}</span>
              </section>
              <section className="record-item-content">
                <p><span>Customer's name：</span>{item.customers_name} &emsp; {item.customers_phone}</p>
                <p><span>pro&emsp;duct：</span>{item.product[0].product_name}</p>
                <p><span>amo&emsp;unt：</span>{item.sales_money} &emsp; commission：{item.commission}</p>
              </section>
              <p className="record-item-footer">Waiting for the administrator to review, after the review is passed, the commission will be settled to the account</p>
            </li>
          })
        }
        </ul>
      </div>
    );
  }

}

export default RecordList;