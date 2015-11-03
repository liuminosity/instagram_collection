var React = require('react');

var CollectionImageBox = React.createClass({

  CaptionBlock: function CaptionBlock() {
    // console.log(this.props.caption, this.props.caption.length);
    return this.props.caption.length < 44 ? <span style={{'color': 'white', 'font': '13px/24px Monaco, Sans-Serif', 'letterSpacing': '-1px', 'background': 'rgb(0, 0, 0)', 'background': 'rgba(0, 0, 0, 0.7)', 'padding': '10px'}}>{this.props.caption}</span> :
      <span style={{'color': 'white', 'font': '13px/24px Monaco, Sans-Serif', 'letterSpacing': '-1px', 'background': 'rgb(0, 0, 0)', 'background': 'rgba(0, 0, 0, 0.7)', 'padding': '10px'}}>{this.props.caption.slice(0,41)}...</span>;
  },

  ImageVideoBlock: function ImageVideoBlock() {
    return this.props.type==='video' ? <video src={this.props.mediaUrl} height="320" width="320" style={{'border':'1px solid black'}} controls/> :
      <img src={this.props.mediaUrl} height="320" width="320" style={{'border':'1px solid black'}}/> ;
  },

  render: function render() {
    console.log(this.props.mediaUrl, this.props.type);
    return (
        <div style={{'float': 'left', 'marginTop': '1%', 'marginLeft': '1%', 'borderStyle': 'outset', 'width':'500px', 'height':'340px'}}> 
          <div style={{'position': 'relative', 'width': '100%', 'marginTop': '1%', 'marginLeft': '1%'}}>
            { this.ImageVideoBlock() }
            <h2 style={{'position': 'absolute', 'top': '250px', 'left': '0', 'width': '100%'}}> 
              { this.CaptionBlock() }
            </h2>
            <div style={{'float': 'right', 'marginRight':'3%'}}>
              <a href={this.props.sourceUrl} target="_newtab">View on Instagram</a> <br/>
            </div>
          </div>
          
        </div>
      );
  },
})

module.exports = CollectionImageBox;
