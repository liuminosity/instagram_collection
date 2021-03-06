var React = require('react');

var ImageBox = React.createClass({

  //Saves the image to the collection cache in state
  handleSave: function handleSave() {
    this.props.cacheToCollection(this.props.index);
  },

  //Remove the image from the display, but NOT the collection cache (not yet!)
  handleRemove: function handleRemove() {
    this.props.removeImage(this.props.index);
  },

  //Renders the caption block on top of images. If the caption is too long, returns a truncated version with "..."
  CaptionBlock: function CaptionBlock() {
    return this.props.caption.length < 44 ? <span style={{'color': 'white', 'font': '13px/24px Monaco, Sans-Serif', 'letterSpacing': '-1px', 'background': 'rgb(0, 0, 0)', 'background': 'rgba(0, 0, 0, 0.7)', 'padding': '10px'}}>{this.props.caption}</span> :
      <span style={{'color': 'white', 'font': '13px/24px Monaco, Sans-Serif', 'letterSpacing': '-1px', 'background': 'rgb(0, 0, 0)', 'background': 'rgba(0, 0, 0, 0.7)', 'padding': '10px'}}>{this.props.caption.slice(0,41)}...</span>;
  },

  //Renders the saved button. If the user has clicked on it, displays an "Image saved"
  SaveButtonBlock: function SaveButtonBlock() {
    return this.props.saved ? <div><span style={{'color':'green'}}> Image saved! </span><br/></div> : 
      <div><i className='fa fa-floppy-o'></i><span onClick={this.handleSave} style={{cursor:'pointer'}}> Save this image </span> <br/></div>;
  },

  //Renders a video if the media is a video (with playback ability), else renders an image
  ImageVideoBlock: function ImageVideoBlock() {
    return this.props.type==='video' ? <video src={this.props.mediaUrl} height="320" width="320" style={{'border':'1px solid black'}} controls/> :
      <img src={this.props.mediaUrl} height="320" width="320" style={{'border':'1px solid black'}}/> ;
  },

  render: function render() {
    return (
        <div style={{'float': 'left', 'marginTop': '1%', 'marginRight': '1%', 'borderStyle': 'outset', 'width':'500px', 'height':'340px'}}> 
          <div style={{'position': 'relative', 'width': '100%', 'marginTop': '1%', 'marginLeft': '1%'}}>
            { this.ImageVideoBlock() }
            <h2 style={{'position': 'absolute', 'top': '250px', 'left': '0', 'width': '100%'}}> 
              { this.CaptionBlock() }
            </h2>
            <div style={{'float': 'right', 'marginRight':'3%'}}>
              <i className="fa fa-user"></i>  { this.props.username } <br/><br/>
              { this.SaveButtonBlock() }
               <a href={this.props.sourceUrl} target="_newtab"><i className="fa fa-instagram"></i>  View on Instagram</a> <br/>
              <span onClick={this.handleRemove} style={{cursor:'pointer', 'color':'red'}}> <i className="fa fa-ban"></i> Remove this image </span> <br/>
            </div>
          </div>
          
        </div>
      );
  },
})

module.exports = ImageBox;
