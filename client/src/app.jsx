var React = require('react');

//Import components
var LoginButton = require('./components/LoginButton');
var SearchQuery = require('./components/SearchQuery');
var ImageList = require('./components/ImageList');
var CollectionCacheList = require('./components/CollectionCacheList');
var AddCollection = require('./components/AddCollection');
var CollectionsList = require('./components/CollectionsList');
var CollectionImageList = require('./components/CollectionImageList');


// var serverUrl = 'http://127.0.0.1:3000';
//***Uncomment line above and comment out line below to run locally***
var serverUrl = 'https://boiling-headland-4189.herokuapp.com';

var App = React.createClass({

  getInitialState: function getInitialState() {
    return {
      userIsAuthenticated: false,
      currentPage: 'home',
      isLoading: false,
    }
  },

  //Checks if the user is authenticated (with an authentication url--not robust, but it'll do with implicit flow)
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

  /**************************************************
  * These are reducer functions that only alter state
  **************************************************/
  
  //updates the images on the home view (only affects images on the search query, not collections)
  updateImages: function updateImages(data) {
    this.setState({
      searchData: data,
      isLoading: false
    })
  },

  //triggers the isLoading gif
  triggerLoading: function triggerLoading() {
    this.setState({
      isLoading: true
    })
  },

  //Caches the user's saved images to the state
  cacheToCollection: function cacheToCollection(imageData) {
    var collection = this.state.collectionCache;
    collection.push(imageData);
    this.setState({
      collectionCache: collection
    })
  },

  //Clears the temporary collection cache, cleared after a collection is saved
  clearCollectionCache: function clearCollectionCache() {
    this.setState({
      collectionCache: []
    })
  },

  //Stores the pagination data into state for quick retrieval
  cachePagination: function cachePagination(data, paginationURL) {
    this.setState({
      nextPageData: data,
      paginationURL: paginationURL
    })
  },

  //Stores the index of the selected collection
  updateSelectedCollectionIndex: function updateSelectedCollectionIndex(index) {
    this.setState({
      selectedCollectionIndex: index
    })
  },

  //Stores the user's collection after getting them from the server
  storeCollections: function storeCollections(data) {
    this.setState({
      collections: data,
      isLoading: false
    })
  },

  //View change: change view to home
  changeTabToHome: function changeTabToHome() {
    if (this.state.currentPage !== 'home') {
      this.setState({currentPage: 'home'});
    }
  },

  //View change: change view to addCollection
  changeTabToAddCollection: function changeTabToAddCollection() {
    if (this.state.currentPage !== 'addCollection') {
      this.setState({currentPage: 'addCollection'});
    }
  },

  //View change: change view to collections
  changeTabToCollections: function changeTabToCollections() {
    if (this.state.currentPage !== 'collections') {
      this.setState({currentPage: 'collections'});
    }
  },

  /**************************************************
  * These are functions that return blocks of XML to be rendered in the App component
  **************************************************/
  
  //Renders loading gif
  LoadingBlock: function LoadingBlock() {
    return this.state.isLoading ? <img src="https://web.sure.com/themes/default/images/loading.gif" style={{'width':'5%', 'marginLeft':'47.5%', 'marginTop': '5%'}}/> : <div/>;
  },

  //Renders the navigation tabs if the user is authenticated
  TabsBlock: function TabsBlock() {
    return this.state.userIsAuthenticated ? 
      <div style={{'marginBottom':'15px'}}>
        <div style={{'margin': '0 auto', 'width': '318px', 'height':'30px'}}>
          <button className='btn btn-primary' style={{'marginLeft':'0%'}} onClick={this.changeTabToHome}>Home</button>
          <button className='btn btn-primary' style={{'marginLeft':'3px'}} onClick={this.changeTabToAddCollection}>Images to be Saved</button>
          <button className='btn btn-primary' style={{'marginLeft':'3px'}} onClick={this.changeTabToCollections}>Collections</button>
        </div>
      </div> :
      <div/>;
  },  

  //Renders the block that displays the Login Button component if the user is not logged in, else displays nothing
  LoginButtonBlock: function LoginButtonBlock() {
    return this.state.userIsAuthenticated ? <div/> : <LoginButton url={serverUrl}/>;
  },

  //Renders the block that displays the search query box and images if the user has requested something, else displays nothing
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

  //Renders the addCollection view (that features images cached but not saved to collection)
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

  //Renders the user's collection, based on which one was selected. If user has no collections, this says so
  CollectionsImageBlock: function CollectionsImageBlock() {
    return this.state.collections.length === 0 ? <div>You have no collections! Start adding one today</div> :
      <div> 
        <hr style={{'marginBottom':'20px','width':'100%'}}/>
        Currently viewing collection: {this.state.collections[this.state.selectedCollectionIndex].collectionName}
        <CollectionImageList 
          imageData={this.state.collections[this.state.selectedCollectionIndex].data}/>
      </div>;
  },

  //Renders the collections view (that features saved collections)
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
      <div>
        <h1 className='header'>Instagram Collector </h1>
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
