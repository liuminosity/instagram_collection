var React = require('react');

var CollectionButton = React.createClass({

  handleClick: function handleClick() {
    this.props.updateSelectedCollectionIndex(this.props.index);
  },

  render: function render() {
    return (
      <li className = 'list-group-item' onClick={this.handleClick} style={{'cursor':'pointer', 'marginRight':'.5%', 'marginBottom':'1%'}}>{this.props.collectionName}</li>
      );
  },
})

module.exports = CollectionButton;
