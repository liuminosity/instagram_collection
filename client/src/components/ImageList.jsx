var React = require('react');

var ImageBox = require('./ImageBox');

var ImageList = React.createClass({

  removeImage: function removeImage(index) {
    this.props.imageData.splice(index, 1);
    this.props.callback(this.props.imageData);
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
      </div>
      );
  },
})

module.exports = ImageList;
