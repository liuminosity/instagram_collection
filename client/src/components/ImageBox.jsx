var React = require('react');

var ImageBox = React.createClass({

  handleSave: function handleSave() {
    console.log('saved');
  },

  handleRemove: function handleRemove() {
    this.props.callback(this.props.index);
  },

  captionBlock: function captionBlock() {
    // console.log(this.props.caption, this.props.caption.length);
    return this.props.caption.length < 44 ? <span style={{'color': 'white', 'font': '13px/24px Monaco, Sans-Serif', 'letterSpacing': '-1px', 'background': 'rgb(0, 0, 0)', 'background': 'rgba(0, 0, 0, 0.7)', 'padding': '10px'}}>{this.props.caption}</span> :
      <span style={{'color': 'white', 'font': '13px/24px Monaco, Sans-Serif', 'letterSpacing': '-1px', 'background': 'rgb(0, 0, 0)', 'background': 'rgba(0, 0, 0, 0.7)', 'padding': '10px'}}>{this.props.caption.slice(0,41)}...</span>;
  },

  render: function render() {
    return (
        <div style={{'float': 'left', 'marginTop': '1%', 'marginLeft': '1%', 'borderStyle': 'outset', 'width':'500px', 'height':'340px'}}> 
          <div style={{'position': 'relative', 'width': '100%', 'marginTop': '1%', 'marginLeft': '1%'}}>
            <img src={this.props.imageURL} height="320" width="320" style={{'border':'1px solid black'}}/> 
            <h2 style={{'position': 'absolute', 'top': '250px', 'left': '0', 'width': '100%'}}> 
              { this.captionBlock() }
            </h2>
            <div style={{'float': 'right', 'marginRight':'3%'}}>
              <span onClick={this.handleSave} style={{cursor:'pointer'}}> Save this image </span> <br/>
              <a href={this.props.sourceURL} target="_newtab">View on Instagram</a> <br/>
              <span onClick={this.handleRemove} style={{cursor:'pointer'}}> Remove this image </span> <br/>
            </div>
          </div>
          
        </div>
      );
  },
})

module.exports = ImageBox;
