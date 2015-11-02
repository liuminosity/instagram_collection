var React = require('react');

var getCollectionsUrl = 'http://127.0.0.1:3000/getCollections';


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
        // console.log('this', _this);
        _this.props.storeCollections(data.collections);
      }
    })
  },

  render: function render() {
    var collectionArray = [];
    return (
      <div style={{'width':'95%', 'marginLeft':'2.5%'}}>
      </div>
      );
  },
})

module.exports = CollectionsList;
