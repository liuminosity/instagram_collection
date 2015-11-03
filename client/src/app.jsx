var React = require('react');

var LoginButton = require('./components/LoginButton');
var SearchQuery = require('./components/SearchQuery');
var ImageList = require('./components/ImageList');
var CollectionCacheList = require('./components/CollectionCacheList');
var AddCollection = require('./components/AddCollection');
var CollectionsList = require('./components/CollectionsList');
var CollectionImageList = require('./components/CollectionImageList');

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
    if (token.length > 30) {
      _this.setState({
        userIsAuthenticated: true,
        token: token,
        searchData: [],
        paginationURL: '',
        collectionCache: [],
        collections: [],
        selectedCollectionIndex: 0,
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

  updateImages: function updateImages(data) {
    this.setState({
      searchData: data
    })
  },

  cacheToCollection: function cacheToCollection(imageData) {
    var collection = this.state.collectionCache;
    collection.push(imageData);
    this.setState({
      collectionCache: collection
    })
  },

  clearCollectionCache: function clearCollectionCache() {
    this.setState({
      collectionCache: []
    })
  },

  cachePagination: function cachePagination(data, paginationURL) {
    this.setState({
      nextPageData: data,
      paginationURL: paginationURL
    })
  },

  updateSelectedCollectionIndex: function updateSelectedCollectionIndex(index) {
    this.setState({
      selectedCollectionIndex: index
    })
  },

  storeCollections: function storeCollections(data) {
    console.log(data);
    this.setState({
      collections: data
    })
  },

  changeTabToHome: function changeTabToHome() {
    if (this.state.currentPage !== 'home') {
      this.setState({currentPage: 'home'});
    }
  },

  changeTabToAddCollection: function changeTabToAddCollection() {
    if (this.state.currentPage !== 'addCollection') {
      this.setState({currentPage: 'addCollection'});
    }
  },

  changeTabToCollections: function changeTabToCollections() {
    if (this.state.currentPage !== 'collections') {
      this.setState({currentPage: 'collections'});
    }
  },

  TabsBlock: function TabsBlock() {
    return this.state.userIsAuthenticated ? 
      <div style={{'width':'60%', 'marginLeft':'20%', 'marginBottom':'5%'}}>
        <span onClick={this.changeTabToHome} style={{cursor:'pointer', 'marginLeft':'14%', 'marginRight':'14%'}}>Home</span>
        <span onClick={this.changeTabToAddCollection} style={{cursor:'pointer', 'marginLeft':'14%', 'marginRight':'14%'}}>Images to be saved</span>
        <span onClick={this.changeTabToCollections} style={{cursor:'pointer', 'marginLeft':'14%', 'marginRight':'14%'}}>Collections</span>
      </div> :
      <div/>;
  },  

  //Block that displays the Login Button component if the user is not logged in, else displays nothing
  LoginButtonBlock: function LoginButtonBlock() {
    return this.state.userIsAuthenticated ? <div/> : <LoginButton />;
  },

  //Block that displays images if the user has requested something, else displays nothing
  ImagesBlock: function ImagesBlock() {
    return this.state.userIsAuthenticated && this.state.currentPage === 'home' ? 
      <div>
        <SearchQuery 
          token={this.state.token} 
          updateImages={this.updateImages} 
          cachePagination={this.cachePagination}/>
        <ImageList 
          imageData={this.state.searchData} 
          nextPageData={this.state.nextPageData} 
          paginationURL={this.state.paginationURL} 
          updateImages={this.updateImages} 
          cacheToCollection={this.cacheToCollection}
          cachePagination={this.cachePagination}/>
      </div> : <div/>;
  },

  AddCollectionsViewBlock: function AddCollectionsViewBlock() {
    return this.state.currentPage === 'addCollection' ? 
      <div> 
        <AddCollection 
          token={this.state.token} 
          collectionCache={this.state.collectionCache}
          clearCollectionCache={this.clearCollectionCache}/>
        <CollectionCacheList 
          imageData={this.state.collectionCache} />
      </div> : <div/>;
  },

  CollectionsImageBlock: function CollectionsImageBlock() {
    return this.state.collections.length === 0 ? <div/> :
      <CollectionImageList 
          imageData={this.state.collections[this.state.selectedCollectionIndex].data}/>;
  },

  CollectionsViewBlock: function CollectionsViewBlock() {
    return this.state.currentPage === 'collections' ?
      <div> 
        <CollectionsList
          storeCollections={this.storeCollections}
          updateSelectedCollectionIndex={this.updateSelectedCollectionIndex}
          collections={this.state.collections}
          token={this.state.token}/>
        { this.CollectionsImageBlock() }
      </div> : <div/>;
  },

  render: function render() {
    return (
      <div>
        <h1>Instagram Collector </h1>
        { this.TabsBlock() }
        { this.LoginButtonBlock() }
        { this.ImagesBlock() }
        { this.AddCollectionsViewBlock() }
        { this.CollectionsViewBlock() }
      </div>
      )
  },
})

var element = React.createElement(App);
React.render(element, document.querySelector('.container'));
