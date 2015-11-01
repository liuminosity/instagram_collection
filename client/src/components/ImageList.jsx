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

  MoreImagesBlock: function MoreImagesBlock() {
    return this.props.paginationURL === '' || this.props.paginationURL === undefined ? <div/> : <span onClick={this.handlePagination} style={{'position': 'absolute', 'bottom': '0', 'cursor':'pointer'}}> More images... </span>; 

  },

  render: function render() {
    var imageArray = [];
    for (var i = 0; i < this.props.imageData.length; i++) {
      var imageURL = this.props.imageData[i].images.low_resolution.url;
      var sourceURL = this.props.imageData[i].link;
      var caption = this.props.imageData[i].caption.text
      imageArray.push(<ImageBox imageURL={imageURL} sourceURL={sourceURL} caption={caption} callback={this.removeImage} key={i} index={i}/>)
    };
    return (
      <div style={{'width':'95%', 'marginLeft':'2.5%'}}>
        {imageArray}
        <div style={{'position': 'relative', 'marginTop':'2%'}}>
          { this.MoreImagesBlock() }
        </div>
      </div>
      );
  },
})

module.exports = ImageList;
