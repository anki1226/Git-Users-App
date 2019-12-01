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
      subDetailEle: ''
    };
  }
  // componentDidMount() {
  //     getUsers();
  // }
  getUsers(event) {
    this.setState({ name: event.target.value });
    const updatedKeyword = event.target.value;
    console.log(updatedKeyword);
    fetch('https://api.github.com/search/users?q=' + updatedKeyword + '')
      .then(res => res.json())
      .then(result => {
        this.setState({
          items: result.items,
          totalCount: result.total_count
        });
      });
    console.log(this.state.items);
  }
  getUserDetails(login, id) {
    debugger;

    this.state.subDetailEle = '#detail-box-' + id + '';
    fetch('https://api.github.com/users/' + login + '/repos')
      .then(res => res.json())
      .then(result => {
        console.log(result);
        //let x = { data: result };
        //< data={result} />;
        for (let user of result) {
          <UserDetail id={user.id} />;
        }
        // this.setState({
        //   subDetails: x.data
        // });
        $('#detail-box-' + id + '').toggle();
        console.log('after get');
        console.log(this.state.subDetails);
        //$(".user-details").collapse=true;
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <header className="header">
          <div className="container-search--">
            <div className="row vertical-spacer-10"></div>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-3">
                <select className="select-box form-control">
                  <option>Sort By Name(A-z)</option>
                  <option>Sort By Name(A-z)</option>
                  <option>Sort By Rank asending</option>
                  <option>Sort By Rank decending</option>
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
                  <div className="row user-card" key={item.id}>
                    <div className="col-md-2">
                      <img
                        src={item.avatar_url}
                        className="img-card"
                        alt="..."
                      ></img>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">Repository : {item.url}</p>
                        <p className="card-text">
                          Repository Url : {item.repos_urlurl}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-2 text-right">
                      <button
                        className="details btn btn-outline-primary"
                        onClick={() => this.getUserDetails(item.login, item.id)}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
