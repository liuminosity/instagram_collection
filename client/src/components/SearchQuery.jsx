var React = require('react');

var SearchQuery = React.createClass({

  //Action that is triggered once user hits login. 
  handleFormSubmit: function handleFormSubmit(event) {
    var _this = this;
    event.preventDefault();

    var input = React.findDOMNode(this.refs.tags).value;

    var apiQuery = 'https://api.instagram.com/v1/tags/' + input + '/media/recent?access_token=' + this.props.token;
    // console.log(apiQuery);

    $.ajax({
      url: apiQuery,
      dataType: "jsonp",
      success: function(data) {
        console.log(data);
        _this.props.callback(data.data);
      }
    })

    //https://api.instagram.com/v1/tags/{tag-name}/media/recent?access_token=ACCESS-TOKEN


  },

  render: function render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input style={{'width': '40%'}} type="text" placeholder="What tag do you want to search?" ref="tags" />
          <input type="submit" value="Submit" />
        </form>
      </div>
      );
  },
})

module.exports = SearchQuery;
