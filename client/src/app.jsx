var React = require('react');

var LoginButton = require('./components/LoginButton');
var SearchQuery = require('./components/SearchQuery');
var ImageList = require('./components/ImageList');
var CollectionCacheList = require('./components/CollectionCacheList');
var AddCollection = require('./components/AddCollection');
var CollectionsList = require('./components/CollectionsList');
var CollectionImageList = require('./components/CollectionImageList');


// var serverUrl = 'http://127.0.0.1:3000';
//Uncomment line above and comment out line below to run locally
var serverUrl = 'https://boiling-headland-4189.herokuapp.com';

var App = React.createClass({

  getInitialState: function getInitialState() {
    return {
      userIsAuthenticated: false,
      currentPage: 'home',
      isLoading: true,
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
        isLoading: false
      })
    }
  },

  updateImages: function updateImages(data) {
    this.setState({
      searchData: data,
      isLoading: false
    })
  },

  triggerLoading: function triggerLoading() {
    this.setState({
      isLoading: true
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
    this.setState({
      collections: data,
      isLoading: false
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

  LoadingBlock: function LoadingBlock() {
    return this.state.isLoading ? <img src="https://web.sure.com/themes/default/images/loading.gif" style={{'width':'5%', 'marginLeft':'47.5%', 'marginTop': '5%'}}/> : <div/>;
  },

  TabsBlock: function TabsBlock() {
    return this.state.userIsAuthenticated ? 
      <div style={{'width':'95%', 'marginBottom':'15px'}}>
        <span onClick={this.changeTabToHome} style={{cursor:'pointer', 'marginRight':'1%','padding':'5px','paddingLeft':'20px','paddingRight':'20px','borderStyle': 'inset'}}>Home</span>
        <span onClick={this.changeTabToAddCollection} style={{cursor:'pointer', 'marginLeft':'1%', 'marginRight':'1%', 'padding':'5px','paddingLeft':'20px','paddingRight':'20px', 'borderStyle': 'inset'}}>Images to be saved</span>
        <span onClick={this.changeTabToCollections} style={{cursor:'pointer', 'marginLeft':'1%', 'marginRight':'1%', 'padding':'5px','paddingLeft':'20px','paddingRight':'20px', 'borderStyle': 'inset'}}>Collections</span>
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
          serverUrl={serverUrl}
          updateImages={this.updateImages} 
          triggerLoading={this.triggerLoading}
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
          serverUrl={serverUrl}
          collectionCache={this.state.collectionCache}
          clearCollectionCache={this.clearCollectionCache}/>
        <CollectionCacheList 
          imageData={this.state.collectionCache} />
      </div> : <div/>;
  },

  CollectionsImageBlock: function CollectionsImageBlock() {
    return this.state.collections.length === 0 ? <div>You have no collections! Start adding one today</div> :
      <CollectionImageList 
          imageData={this.state.collections[this.state.selectedCollectionIndex].data}/>;
  },

  CollectionsViewBlock: function CollectionsViewBlock() {
    return this.state.currentPage === 'collections' ?
      <div> 
        <CollectionsList
          serverUrl={serverUrl}
          storeCollections={this.storeCollections}
          triggerLoading={this.triggerLoading}
          updateSelectedCollectionIndex={this.updateSelectedCollectionIndex}
          collections={this.state.collections}
          token={this.state.token}/>
        { this.CollectionsImageBlock() }
      </div> : <div/>;
  },

  render: function render() {
    return (
      <div style={{'marginLeft':'2.5%', 'width':'95%'}}>
        <h1>Instagram Collector </h1>
        
        { this.TabsBlock() }
        <hr style={{'marginBottom':'20px', 'width':'100%'}}/>
        { this.LoginButtonBlock() }
        { this.ImagesBlock() }
        { this.AddCollectionsViewBlock() }
        { this.CollectionsViewBlock() }
        { this.LoadingBlock() }
      </div>
      )
  },
})

var element = React.createElement(App);
React.render(element, document.querySelector('.container'));
