import React, { Component } from 'react';
import $ from 'jquery';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    debugger;
    // this.state = {
    //   data: this.props.data
    // };
    console.log(this.state.data);
  }

  render() {
    return <div id="detail-box">{this.props.id}</div>;
  }
}

export default UserDetail;
