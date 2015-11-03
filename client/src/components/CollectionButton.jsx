var React = require('react');

var CollectionButton = React.createClass({

  handleClick: function handleClick() {
    this.props.updateSelectedCollectionIndex(this.props.index);
  },

  render: function render() {
    return (
      <span onClick={this.handleClick} style={{'cursor':'pointer'}}>{this.props.collectionName}<br/></span>
      );
  },
})

module.exports = CollectionButton;
