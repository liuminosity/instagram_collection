var React = require('react');

var CollectionImageBox = require('./CollectionImageBox');

var CollectionImageList = React.createClass({

  render: function render() {
    var imageArray = [];
    for (var i = 0; i < this.props.imageData.length; i++) {
      var imageURL = this.props.imageData[i].images.low_resolution.url;
      var sourceURL = this.props.imageData[i].link;
      var caption = this.props.imageData[i].caption.text;
      imageArray.push(
        <CollectionImageBox 
          imageURL={imageURL} 
          sourceURL={sourceURL} 
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
