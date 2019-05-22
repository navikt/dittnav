import React, { Component } from 'react';
import Login from 'js/pages/Login';

class LoginWrapper extends Component {
  render() {
    return (
      <main role="main">
        <div className="container">
          <Login />
        </div>
      </main>
    );
  }
}

export default LoginWrapper;
