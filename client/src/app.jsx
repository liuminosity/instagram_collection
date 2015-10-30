var React = require('react');

var LoginButton = require('./components/LoginButton');

var App = React.createClass({

  getInitialState: function getInitialState() {
    return {
      userIsAuthenticated: false
    }
  },

  LoginButtonBlock: function LoginButtonBlock() {
    return this.state.userIsAuthenticated ? <div/> : <LoginButton />;
  },

  render: function render() {
    return (
      <div>
        <h1>Instagram Collector </h1>
        <div> Sup world </div>
        { this.LoginButtonBlock() }
      </div>
      )
  },
})

var element = React.createElement(App);
React.render(element, document.querySelector('.container'));
