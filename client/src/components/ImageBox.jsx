var React = require('react');

var ImageBox = React.createClass({

  render: function render() {
    return (
        <div> <img src={this.props.url} height="320" width="320" /> </div>
      );
  },
})

module.exports = ImageBox;
