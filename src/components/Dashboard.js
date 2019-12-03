import React, { Component } from 'react';
import { restElement } from '@babel/types';
import UserDetail from './userDetail';
import $ from 'jquery';

class Dashboard extends Component {
  constructor(props) {
    // $('#detail-box').display('none');
    super(props);
    this.state = {
      items: [],
      name: '',
      totalCount: 0,
      subDetails: [],
      subDetailEle: '',
      hasSubDetailEle : false,
      currentPage: 1,
      itemsPerPage: 50
      
    };
    this.handleClick = this.handleClick.bind(this);
  }
  // componentDidMount() {
  //     getUsers();
  // }
  getUsers(event) {
    this.setState({ name: event.target.value });
    const updatedKeyword = event.target.value;
    this.setState({
      name:updatedKeyword
    })
    console.log(updatedKeyword);
    fetch('https://api.github.com/search/users?q=' + updatedKeyword + '&per_page=50')
      .then(res => res.json())
      .then(result => {
        this.setState({
          items: result.items,
          totalCount: result.total_count
        });
      });
    console.log(this.state.items);
  }
  showDetails(name,id){
    
    //this.state.subDetailEle = '#detail-box-' + id + '';
   
    this.getUserDetails(name,id);
    $('#btn-' + id + '').textContent = "Collapse";
  }
  getUserDetails(login, id) {
    //debugger;    
    fetch('https://api.github.com/users/' + login + '/repos')
      .then(res => res.json())
      .then(result => {
        console.log(result);
        //let x = { data: result };
        //< data={result} />;
        // for (let user of result) {
        //   <UserDetail id={user.id} />;
        // }
        
        this.setState({
          subDetails: result,
          hasSubDetailEle : true,
          subDetailEle : 'detail-box-' + id + ''
        });
        //$('#detail-box-' + id + '').toggle();
        console.log('after get');
        console.log(this.state.subDetails);
        
        //$(".user-details").collapse=true;
      });
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
    fetch('https://api.github.com/search/users?q=' + this.state.name + '&page='+Number(event.target.id)+'&per_page=50')//&sort=stars&order=desc&page=1&per_page=10
    .then(res => res.json())
    .then(result => {
      console.log("result");
      console.log(result);
      this.setState({
        items: result.items,
        
      });
      
    })
    
    
  }
// getsortedData(cat,order){
//   fetch('https://api.github.com/search/users?q=' + this.state.name + '&sort='+cat+'&order='+order+'')//&sort=stars&order=desc&page=1&per_page=10
//     .then(res => res.json())
//     .then(result => {
//       // this.setState({
//       //   items: result.items,
        
//       // });
//     })
// }
  render() {
    const { totalCount, currentPage, itemsPerPage,items  } = this.state;
let initialtext = "Details";
    // Logic for displaying todos
   // const indexOfLastTodo = currentPage * itemsPerPage;
   // const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
   // const currentitems = items.slice(indexOfFirstTodo, indexOfLastTodo);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCount / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });
    return (
      <div className="container-fluid">
        <header className="header">
          <div className="container-search--">
            <div className="row vertical-spacer-10"></div>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-3">
                <select className="select-box form-control">
                <option>Sort By Name(A-Z)</option>
                  <option> Sort By Name(Z-A)</option>
                  <option>Sort By Rank asending</option>
                  <option>Sort By Rank decending</option>
                  {/* <option onClick={this.getsortedData('login','asc')}>Sort By Name(A-Z)</option>
                  <option onClick={this.getsortedData('login','desc')}>Sort By Name(Z-A)</option>
                  <option onClick={this.getsortedData('score','asc')}>Sort By Rank asending</option>
                  <option onClick={this.getsortedData('score','desc')}>Sort By Rank decending</option> */}
                </select>
              </div>
              <div className="col-md-5">
                <input
                  className="search-box form-control"
                  type="text"
                  onChange={event => this.getUsers(event)}
                  value={this.state.name}
                ></input>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </header>
        <div className="main-container">
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-2">
                <div className="row vertical-spacer-10"></div>
                <div className="row">
                  <b>Total Results: </b>
                  {this.state.totalCount}
                </div>
                <div className="row vertical-spacer-10"></div>
                {this.state.items.map((item, i) => (
                  <div key={item.id} className="user-card">
                    <div className="row" >
                      <div className="col-md-2">
                        <img
                          src={item.avatar_url}
                          className="img-card"
                          alt="..."
                        ></img>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{item.login}</h5>
                          <p className="card-text">Repository : {item.url}</p>
                          <p className="card-text">
                            Repository Url : {item.repos_urlurl}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-2 text-right">
                        <button id={'btn-'+item.id} value="Details"
                          className="details btn btn-outline-primary"
                          onClick={() => this.showDetails(item.login,item.id)}
                        >
                         
                        </button>
                      </div>
                      
                    </div>
                    <div className="row">{this.state.hasSubDetailEle && this.state.subDetailEle == ('detail-box-'+item.id) ? <UserDetail data={this.state.subDetails}/> : ''}</div>
                    {/* <div className="row" id={'detail-box-'+item.id}>{(this.state.subDetailEle == ('detail-box-'+item.id) && this.state.hasSubDetailEle) ? this.getUserDetails(item.login, item.id) : ''}</div> */}
                    {/* <div className="row" id={'detail-box-'+item.id}>{this.state.subDetails.map((item, i) => (
                  <div key={item.id}>
                  {item}
                  </div>))}</div> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
      </div>
    );
  }
}

export default Dashboard;
