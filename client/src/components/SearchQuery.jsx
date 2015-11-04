var React = require('react');
var moment = require('moment');

var SearchQuery = React.createClass({

  //Action that is triggered once user hits login. 
  handleFormSubmit: function handleFormSubmit(event) {
    var _this = this;
    event.preventDefault();
    var timeSearchUrl = this.props.serverUrl + '/timeSearch'

    //Gets input values from the user/DOM
    var tagInput = React.findDOMNode(this.refs.tags).value.trim();
    var startInput = React.findDOMNode(this.refs.start).value.trim();
    var endInput = React.findDOMNode(this.refs.end).value.trim();

    if (tagInput === '') {
      //TODO: make a better UX for empty string
      //TODO: handle spacebars
      console.log('please input a tag'); 

    //If either the start or end inputs are empty, assume search only for recent tags
    } else if (startInput === '' || endInput === '') {
      var apiQuery = 'https://api.instagram.com/v1/tags/' + tagInput + '/media/recent?access_token=' + this.props.token;
      _this.props.triggerLoading();
      $.ajax({
        url: apiQuery,
        dataType: "jsonp",
        success: function(data) {
          _this.props.updateImages(data.data);
          $.ajax({
            url: data.pagination.next_url,
            dataType: "jsonp",
            success: function(nextData) {
              console.log(nextData);
              _this.props.cachePagination(nextData.data, nextData.pagination.next_url)
            }
          })
        }
      })

    //Else take the time range and send the request to the server, which will handle the rest of the request
    } else {
      //Changes time into unix
      var unixStart = new Date(startInput).getTime()/1000;
      var unixEnd = new Date(endInput).getTime()/1000;
      _this.props.triggerLoading();
      $.ajax({
        type: 'POST',
        url: timeSearchUrl,
        contentType: 'application/json',
        data: JSON.stringify({
          startTime: unixStart,
          endTime: unixEnd,
          tag: tagInput,
          accessToken: this.props.token
        }),
        success: function(data) {
          //TODO: display messages from server
          console.log(data.message);
          _this.props.updateImages(data.data)
        }
      })
    }
  },

  render: function render() {
    var dateToday = moment().format().slice(0,10);
    var dateYesterday = moment().subtract(1, 'day').format().slice(0,10);
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input className='.input-lg' style={{'width': '40%'}} type="text" placeholder="What tag do you want to search?" ref="tags" /><br/>
          <div style={{'marginTop': '1%'}}>
            Timeframe: (optional--leave blank for all recent media): <br/>
            Start date:
            <input style={{'width': '20%'}} type="date" max={dateYesterday} ref="start" />
            End date:
            <input style={{'width': '20%'}} type="date" max={dateToday} ref="end" />
            <input type="submit" value="Submit" />
          </div>

        </form>
      </div>
      );
  },
})

module.exports = SearchQuery;
