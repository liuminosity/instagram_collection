var React = require('react');

var LoginButton = require('./components/LoginButton');
var SearchQuery = require('./components/SearchQuery');
var ImageList = require('./components/ImageList');

var App = React.createClass({

  getInitialState: function getInitialState() {
    return {
      userIsAuthenticated: false,
    }
  },

  componentWillMount: function componentWillMount() {
    var _this = this;
    var token = window.location.hash.slice(14);
    if (token.length === 51) {
      _this.setState({
        userIsAuthenticated: true,
        token: token,
        searchData: [],
        paginationURL: '',
      })
    }

    // if (this.props.params.token) {
    //   var params = _this.props.params.token.split('&')
    //   console.log(params);
    //   var access_token = params[0].slice(13);
    //   console.log('this is access token',access_token)
    //   this.setState({
    //     userIsAuthenticated: true,
    //     access_token: access_token
    //   })
    // } else {
    //   console.log('log in');
    // }
  },

  nextPageData: [],

  updateImages: function updateImages(data) {
    this.setState({
      searchData: data,
    });
  },

  cachePagination: function cachePagination(data, paginationURL) {
    this.setState({
      nextPageData: data,
      paginationURL: paginationURL
    })
  },

  //Block that displays the Login Button component if the user is not logged in, else displays nothing
  LoginButtonBlock: function LoginButtonBlock() {
    return this.state.userIsAuthenticated ? <SearchQuery token={this.state.token} updateImages={this.updateImages} cachePagination={this.cachePagination}/>: <LoginButton />;
  },

  //Block that displays images if the user has requested something, else displays nothing
  ImagesBlock: function ImagesBlock() {
    return this.state.userIsAuthenticated ? <div><ImageList imageData={this.state.searchData} nextPageData={this.state.nextPageData} paginationURL={this.state.paginationURL} updateImages={this.updateImages} cachePagination={this.cachePagination}/></div> : <div/>;
  },

  render: function render() {
    return (
      <div>
        <h1>Instagram Collector </h1>
        { this.LoginButtonBlock() }
        { this.ImagesBlock() }
      </div>
      )
  },
})

var element = React.createElement(App);
React.render(element, document.querySelector('.container'));
