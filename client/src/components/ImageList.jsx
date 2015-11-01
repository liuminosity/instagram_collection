var React = require('react');

var ImageBox = require('./ImageBox');

var ImageList = React.createClass({

  render: function render() {
    var imageArray = [];
    for (var i = 0; i < this.props.imageData.length; i++) {
      var imageURL = this.props.imageData[i].images.low_resolution.url;
      imageArray.push(<ImageBox url={imageURL} key={i}/>)
    };
    return (
      <div>
        {imageArray}
      </div>
      );
  },
})

module.exports = ImageList;
