var React = require('react');

var AddCollection = React.createClass({

  //Action that is triggered once user hits login. 
  handleFormSubmit: function handleFormSubmit(event) {
    var _this = this;
    var addCollectionUrl = this.props.serverUrl + '/addCollection';
    event.preventDefault();
    var collectionName = React.findDOMNode(this.refs.collectionName).value;

    $.ajax({
      type: 'POST',
      url: addCollectionUrl,
      contentType: 'application/json',
      data: JSON.stringify({
        collectionName: collectionName,
        collectionData: this.props.collectionCache,
        accessToken: this.props.token
      }),
      success: function(data) {
        _this.props.clearCollectionCache();
        console.log(data)
      }
    })
  },

  render: function render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input style={{'width': '40%'}} type="text" placeholder="What do you want to name this collection?" ref="collectionName" /><br/>
          <div style={{'marginTop': '1%'}}>
            <input type="submit" value="Save this collection!" />
          </div>
        </form>
      </div>
      );
  },
})

module.exports = AddCollection;
