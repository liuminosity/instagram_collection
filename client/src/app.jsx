var React = require('react');

var LoginButton = require('./components/LoginButton');
var SearchQuery = require('./components/SearchQuery');
var ImageList = require('./components/ImageList');

var App = React.createClass({

  getInitialState: function getInitialState() {
    return {
      userIsAuthenticated: false,
      currentPage: 'home',
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

  changeTabToHome: function changeTabToHome() {
    if (this.state.currentPage !== 'home') {
      this.setState({currentPage: 'home'});
    }
  },

  changeTabToCollections: function changeTabToCollections() {
    if (this.state.currentPage !== 'collections') {
      this.setState({currentPage: 'collections'});
    }
  },

  TabsBlock: function TabsBlock() {
    return this.state.userIsAuthenticated ? 
      <div style={{'width':'40%', 'marginLeft':'20%', 'marginBottom':'5%'}}>
        <span onClick={this.changeTabToHome} style={{cursor:'pointer', 'float':'left'}}>Home</span>
        <span onClick={this.changeTabToCollections} style={{cursor:'pointer', 'float':'right'}}>Collections</span>
      </div> :
      <div/>;
  },  

  //Block that displays the Login Button component if the user is not logged in, else displays nothing
  LoginButtonBlock: function LoginButtonBlock() {
    return this.state.userIsAuthenticated ? <SearchQuery token={this.state.token} updateImages={this.updateImages} cachePagination={this.cachePagination}/>: <LoginButton />;
  },

  //Block that displays images if the user has requested something, else displays nothing
  ImagesBlock: function ImagesBlock() {
    return this.state.userIsAuthenticated && this.state.currentPage === 'home' ? 
    <div><ImageList imageData={this.state.searchData} nextPageData={this.state.nextPageData} paginationURL={this.state.paginationURL} updateImages={this.updateImages} cachePagination={this.cachePagination}/></div> : <div/>;
  },

  CollectionsViewBlock: function CollectionsViewBlock() {
    return this.state.currentPage === 'collections' ? <div> collections here </div> : <div/>;
  },

  render: function render() {
    return (
      <div>
        <h1>Instagram Collector </h1>
        { this.TabsBlock() }
        { this.LoginButtonBlock() }
        { this.ImagesBlock() }
        { this.CollectionsViewBlock() }
      </div>
      )
  },
})

var element = React.createElement(App);
React.render(element, document.querySelector('.container'));
