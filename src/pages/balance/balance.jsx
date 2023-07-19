import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import PublicHeader from '@/components/header/header';
import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity';
import PublicAlert from '@/components/alert/alert';
import API from '@/api/api';
import './balance.less';

class BrokeRage extends Component{
  state = {
    applyNum: '', //type value
    alertStatus: false,
    alertTip: '', //promps
    balance: {
      balance: 0, 
    },
  }
  // initialize data
  initData = async () => {
    try{
      let result = await API.getBalance();
      console.log(result);
      this.setState({balance: result});
    }catch(err){
      console.error(err);
    }
  }
  
  /**
   * @param  {object} event
   */
  handleInput = event => {
    let value = event.target.value;
    if((/^\d*?\.?\d{0,2}?$/gi).test(value)){
      if((/^0+[1-9]+/).test(value)) {
        value = value.replace(/^0+/,'');
      }
      if((/^0{2}\./).test(value)) {
        value = value.replace(/^0+/,'0');
      }
      value = value.replace(/^\./gi,'0.');
      if(parseFloat(value) > 200){
        value = '200.00';
      }
      this.setState({applyNum: value});
    }
  }
  

  submitForm = () => {
    let alertTip;
    if(!this.state.applyNum){
      alertTip = 'type withdraw amount';
    }else if(parseFloat(this.state.applyNum) > this.state.balance.balance){
      alertTip = 'can not withdraw more than balance';
    }else{
      alertTip = 'application sussess';
    }

    this.setState({
      alertStatus: true,
      alertTip,
      applyNum: '',
    })
  }
  

  closeAlert = () => {
    this.setState({
      alertStatus: false,
      alertTip: '',
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }

  componentDidMount(){
    this.initData();
  }

  render(){
    return (
      <main className="home-container">
        <PublicHeader title='Withdraw' record />
        <section className="broke-main-content">
          <p className="broke-header">Your balance：¥ {this.state.balance.balance}</p>
          <form className="broke-form">
            <p>Please type withdraw amount</p>
            <p>¥ <input type="text" value={this.state.applyNum} placeholder="0.00" onInput={this.handleInput} maxLength="5" /></p>
          </form>
          <TouchableOpacity className="submit-btn" clickCallBack={this.submitForm} text="apply" />
        </section>
        <PublicAlert closeAlert={this.closeAlert} alertTip={this.state.alertTip} alertStatus={this.state.alertStatus} />
      </main>
    );
  }
}

export default BrokeRage;
