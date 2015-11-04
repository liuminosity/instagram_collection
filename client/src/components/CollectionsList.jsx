var React = require('react');

var CollectionButton = require('./CollectionButton');

var CollectionsList = React.createClass({

  //Requests the server for the user's saved collections, and stores it to state
  componentWillMount: function componentWillMount() {
    var _this = this;
    if (this.props.collections.length === 0) {
      this.props.triggerLoading();
    }
    var getCollectionsUrl = this.props.serverUrl + '/getCollections'
    $.ajax({
      type: 'POST',
      url: getCollectionsUrl,
      contentType: 'application/json',
      data: JSON.stringify({
        accessToken: this.props.token
      }),
      success: function(data) {
        //If the data==='' (aka user has no saved collections), set data to empty array
        if (data === '') {
          data = {collections: []};
        } 
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
      <div style={{'margin':'0 auto'}}>
        <b>Your current collections: </b><br/>
        <ul>
        {collectionNamesArray}
        </ul>
      </div>
      );
  },
})

module.exports = CollectionsList;
