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
      hasSubDetailEle: false,
      currentPage: 1,
      itemsPerPage: 10,
      selectedValue: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.getsortedData = this.getsortedData.bind(this);
  }
  // componentDidMount() {
  //     getUsers();
  // }
  getUsers(event) {
    this.setState({ name: event.target.value });
    const updatedKeyword = event.target.value;
    this.setState({
      name: updatedKeyword
    });
    console.log(updatedKeyword);
    if (updatedKeyword.length > 5) {
      fetch(
        'https://api.github.com/search/users?q=' +
          updatedKeyword +
          '&per_page=10'
      )
        .then(res => res.json())
        .then(result => {
          console.log('First fetch ', result.items);
          this.setState({
            items: result.items,
            totalCount: result.total_count
          });
        });
      console.log(this.state.items);
    }
  }
  showDetails(name, id) {
    //this.state.subDetailEle = '#detail-box-' + id + '';

    this.getUserDetails(name, id);
    $('#btn-' + id + '').textContent = 'Collapse';
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
          hasSubDetailEle: true,
          subDetailEle: 'detail-box-' + id + ''
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
    fetch(
      'https://api.github.com/search/users?q=' +
        this.state.name +
        '&page=' +
        Number(event.target.id) +
        '&per_page=50'
    ) //&sort=stars&order=desc&page=1&per_page=10
      .then(res => res.json())
      .then(result => {
        console.log('result');
        console.log(result);
        this.setState({
          items: result.items
        });
      });
  }
  getsortedData(event) {
    let cat, order;
    if (event.target.value == 'Login-desc') {
      cat = 'login';
      order = 'desc';
    }
    if (event.target.value == 'Login-asc') {
      cat = 'login';
      order = 'asc';
    }
    if (event.target.value == 'Score-desc') {
      cat = 'score';
      order = 'desc';
    }
    if (event.target.value == 'Score-asc') {
      cat = 'score';
      order = 'asc';
    }
    this.setState({ selectedValue: event.target.value });
    console.log('Hello' + this.state.name);
    if (this.state.name) {
      fetch(
        //https://api.github.com/search/users?q=kit+in:login&sort=followers&order=asc
        //https://developer.github.com/v3/search/#search-users
        'https://api.github.com/search/users?q=' +
          this.state.name +
          '&sort=' +
          cat +
          '&order=' +
          order +
          ''
      ) //&sort=stars&order=desc&page=1&per_page=10
        .then(res => res.json())
        .then(result => {
          console.log('new result ', result);
          this.setState({
            items: result.items
          });
        });
    }
  }
  render() {
    const { totalCount, currentPage, itemsPerPage, items } = this.state;
    let initialtext = 'Details';
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
        <li key={number} id={number} onClick={this.handleClick}>
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
                <select
                  className="select-box form-control"
                  onChange={this.getsortedData}
                  value={this.state.selectedValue}
                >
                  <option value="Login-asc">Sort By Name(A-Z)</option>
                  <option value="Login-desc">Sort By Name(Z-A)</option>
                  <option value="Score-asc">Sort By Rank asending</option>
                  <option value="Score-desc">Sort By Rank decending</option>
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
                    <div className="row">
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
                          <p className="card-text">
                            Profile URL : {item.html_url}
                          </p>
                          <p className="card-text">score : {item.score}</p>
                          <p className="card-text">
                            Repos URL : {item.repos_url}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-2 text-right">
                        <button
                          id={'btn-' + item.id}
                          value="Details"
                          className="details btn btn-outline-primary"
                          onClick={() => this.showDetails(item.login, item.id)}
                        ></button>
                      </div>
                    </div>
                    <div className="row">
                      {this.state.hasSubDetailEle &&
                      this.state.subDetailEle == 'detail-box-' + item.id ? (
                        <UserDetail data={this.state.subDetails} />
                      ) : (
                        ''
                      )}
                    </div>
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
        <ul id="page-numbers">{renderPageNumbers}</ul>
      </div>
    );
  }
}

export default Dashboard;
