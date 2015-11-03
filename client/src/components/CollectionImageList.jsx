var React = require('react');

var CollectionImageBox = require('./CollectionImageBox');

var CollectionImageList = React.createClass({

  render: function render() {
    var imageArray = [];
    for (var i = 0; i < this.props.imageData.length; i++) {
      var mediaUrl = this.props.imageData[i].videos ? this.props.imageData[i].videos.low_bandwidth.url : this.props.imageData[i].images.low_resolution.url;
      var type = this.props.imageData[i].type;
      var sourceUrl = this.props.imageData[i].link;
      var caption = this.props.imageData[i].caption.text;
      imageArray.push(
        <CollectionImageBox 
          mediaUrl={mediaUrl}
          type={type} 
          sourceUrl={sourceUrl} 
          caption={caption} 
          key={i} 
          index={i}/>)
    };
    return (
      <div style={{'width':'95%', 'marginLeft':'2.5%'}}>
        {imageArray}
      </div>
      );
  },
})

module.exports = CollectionImageList;
