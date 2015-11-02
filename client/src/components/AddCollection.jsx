var React = require('react');

var addCollectionUrl = 'http://127.0.0.1:3000/addCollection';

var AddCollection = React.createClass({

  //Action that is triggered once user hits login. 
  handleFormSubmit: function handleFormSubmit(event) {
    var _this = this;
    event.preventDefault();
    var collectionName = React.findDOMNode(this.refs.collectionName).value;
    // console.log(collectionName);

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
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
      );
  },
})

module.exports = AddCollection;
