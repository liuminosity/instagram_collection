var React = require('react');

var ImageBox = require('./ImageBox');

var ImageList = React.createClass({

  //Updates the view with the next page of images, pre-stored in state
  handlePagination: function handlePagination() {
    var _this = this;
    this.props.updateImages(this.props.nextPageData);
    //TODO: change this to a better scroll function
    window.scrollTo(0,0);
    $.ajax({
      url: this.props.paginationURL,
      dataType: "jsonp",
      success: function(data) {
        _this.props.cachePagination(data.data, data.pagination.next_url);
      }
    })
  },

  //Removes an image from display
  removeImage: function removeImage(index) {
    this.props.imageData.splice(index, 1);
    this.props.updateImages(this.props.imageData);
  },

  //Caches an image to the collection cache in state
  cacheToCollection: function cacheToCollection(index) {
    this.props.imageData[index].saved = true;
    this.props.cacheToCollection(this.props.imageData[index]);
    this.props.updateImages(this.props.imageData);
  },

  //Renders the "Load more images" button
  MoreImagesBlock: function MoreImagesBlock() {
    return this.props.paginationURL === '' || this.props.paginationURL === undefined ? <div/> : 
      <span onClick={this.handlePagination} style={{'cursor':'pointer','padding':'5px','paddingLeft':'20px','paddingRight':'20px','borderStyle': 'inset'}}> Load more images... </span>; 
  },

  render: function render() {
    var imageArray = [];
    for (var i = 0; i < this.props.imageData.length; i++) {
      var mediaUrl = this.props.imageData[i].videos ? this.props.imageData[i].videos.low_bandwidth.url : this.props.imageData[i].images.low_resolution.url;
      var type = this.props.imageData[i].type;
      var username = this.props.imageData[i].user.username;
      var sourceUrl = this.props.imageData[i].link;
      var caption = this.props.imageData[i].caption.text;
      var saved = !!this.props.imageData[i].saved;
      imageArray.push(
        <ImageBox 
          mediaUrl={mediaUrl} 
          type={type}
          username={username}
          sourceUrl={sourceUrl} 
          caption={caption} 
          removeImage={this.removeImage} 
          cacheToCollection={this.cacheToCollection}
          saved={saved}
          key={i} 
          index={i}/>)
    };
    return (
      <div style={{'width':'95%', 'marginLeft':'2.5%'}}>
        {imageArray} 
        <div style={{'float':'left','marginTop':'3%','marginBottom':'3%'}}>
          { this.MoreImagesBlock() }
        </div>
      </div>
      );
  },
})

module.exports = ImageList;
