var React = require('react');

var ImageBox = require('./ImageBox');

var ImageList = React.createClass({

  handlePagination: function handlePagination() {
    var _this = this;
    this.props.updateImages(this.props.nextPageData);
    $.ajax({
      url: this.props.paginationURL,
      dataType: "jsonp",
      success: function(data) {
        _this.props.cachePagination(data.data, data.pagination.next_url);
      }
    })
  },

  removeImage: function removeImage(index) {
    this.props.imageData.splice(index, 1);
    this.props.updateImages(this.props.imageData);
  },

  cacheToCollection: function cacheToCollection(index) {
    this.props.imageData[index].saved = true;
    this.props.cacheToCollection(this.props.imageData[index]);
    this.props.updateImages(this.props.imageData);
  },

  MoreImagesBlock: function MoreImagesBlock() {
    return this.props.paginationURL === '' || this.props.paginationURL === undefined ? <div/> : <span onClick={this.handlePagination} style={{'position': 'absolute', 'bottom': '0', 'cursor':'pointer','padding':'5px','paddingLeft':'20px','paddingRight':'20px','borderStyle': 'inset'}}> Load more images... </span>; 

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
      <div style={{'width':'100%'}}>
        <table>
          <tbody>
            <tr style={{'width':'100%'}}>
              {imageArray}  
            </tr>
          </tbody>
        </table>
        <div style={{'position': 'relative', 'marginTop':'4%', 'marginBottom':'5%', 'marginLeft':'auto', 'marginRight':'auto'}}>
          { this.MoreImagesBlock() }
        </div>
       
      </div>
      );
  },
})

module.exports = ImageList;
