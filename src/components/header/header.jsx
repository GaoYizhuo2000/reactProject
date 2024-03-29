import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './header.less';

export default class PublicHeader extends Component{
  static propTypes = {
    record: PropTypes.any,
    title: PropTypes.string.isRequired,
    confirm: PropTypes.any,
  }

  state = {
    navState: false, //display navbar or not
  };
  
  // toggle left side navbar
  toggleNav = () => {
    this.setState({navState: !this.state.navState});
  }

  FirstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps))|| !is(fromJS(this.state),fromJS(nextState))
  }

  render(){
    return(
      <header className="header-container">
        <span className="header-slide-icon icon-catalog" onClick={this.toggleNav}></span>
        <span className="header-title">{this.props.title}</span>
        {
          this.props.record&&<NavLink to="/record" exact className="header-link icon-jilu"></NavLink>
        }
        {
          this.props.confirm&&<NavLink to="/" exact className="header-link header-link-confim">confirm</NavLink>
        }
        <ReactCSSTransitionGroup
          component={this.FirstChild}
          transitionName="nav"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
            {
              this.state.navState && <aside key='nav-slide' className="nav-slide-list" onClick={this.toggleNav}>
                <NavLink to="/" exact className="nav-link icon-jiantou-copy-copy">Home</NavLink>
                <NavLink to="/balance" exact className="nav-link icon-jiantou-copy-copy">Withdraw</NavLink>
                <NavLink to="/helpcenter" exact className="nav-link icon-jiantou-copy-copy">Help center</NavLink>
              </aside>
            }
        </ReactCSSTransitionGroup>
        
      </header>
    );
  }
}