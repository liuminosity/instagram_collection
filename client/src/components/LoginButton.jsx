var React = require('react');
var instagramAuth = require('../../../instagramAuth');

var LoginButton = React.createClass({

  //Action that is triggered once user hits login. 
  submitLogin: function submitLogin() {
    console.log('hello');
    // window.location.assign();


  },

  render: function render() {
    return (
      <div>
        <span onClick={ this.submitLogin } style={{cursor:'pointer'}}>Log into Instagram</span>
      </div>
      );
  },
})

module.exports = LoginButton;
