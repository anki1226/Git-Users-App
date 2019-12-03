import React, { Component } from 'react';
import $ from 'jquery';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    
    //alert("Hello");
    this.state = {
      data: this.props.data
    };
    console.log(this.props.data);
  }

  render() {
    return <div id="detail-box" className="row">
      {/* <div className="col-md-3">

      </div>
      <div className="col-md-6"> */}
      <table className=" table table-striped">
       {this.props.data.map((item, i) => (         
           <tbody>
            <tr key={item.id}>
            <td></td>
              <td>
{item.name} : 
              </td>
              <td>
{item.language}
              </td>
              <td></td>
            </tr>             
            </tbody>
       ))}</table>
      {/* </div>
     
       <div className="col-md-3">

</div> */}
</div>;
      //  <div className="row">
      //  <div className="col-md-2"></div>
      //   <div className="col-md-4">{item.name} : </div>
      //   <div className="col-md-4">{item.language}</div>
      //   <div className="col-md-2"></div>
      // </div>
    
  }
}

export default UserDetail;
