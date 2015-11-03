var React = require('react');

var CollectionButton = require('./CollectionButton');

var getCollectionsUrl = 'https://boiling-headland-4189.herokuapp.com/getCollections';

var CollectionsList = React.createClass({

  componentWillMount: function componentWillMount() {
    var _this = this;
    $.ajax({
      type: 'POST',
      url: getCollectionsUrl,
      contentType: 'application/json',
      data: JSON.stringify({
        accessToken: this.props.token
      }),
      success: function(data) {
        console.log('hi', data);
        _this.props.storeCollections(data.collections);

      }
    })
  },

  render: function render() {
    var collectionNamesArray = [];
    for (var i = 0; i < this.props.collections.length; i++) {
      collectionNamesArray.push(
        <CollectionButton 
          updateSelectedCollectionIndex={this.props.updateSelectedCollectionIndex}
          collectionName={this.props.collections[i].collectionName}
          key={i}
          index={i}/>)
    }
    return (
      <div style={{'width':'95%', 'marginLeft':'2.5%'}}>
        <b>Your current collections: </b><br/>
        {collectionNamesArray}
      </div>
      );
  },
})

module.exports = CollectionsList;
