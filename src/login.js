import React, { Component } from 'react';

import fire from './config/config';
// import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.eventHandler = this.eventHandler.bind(this);
    this.login = this.login.bind(this);
  }

  eventHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  login(e) {
    e.preventDefault();
    const { email, password } = this.state;
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        alert('User does not exist');
      });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div
        className="login"
        style={{ height: window.innerHeight, textAlign: 'center' }}
      >
        <img alt="logo" src={require('./assets/logo.png')} />
        <form>
          <input
            onChange={this.eventHandler}
            value={email}
            type="email"
            placeholder="EMAIL"
            name="email"
          />
          <input
            onChange={this.eventHandler}
            value={password}
            type="password"
            placeholder="PASSWORD"
            name="password"
          />
          <input
            id="loginBtn"
            onClick={this.login}
            type="submit"
            value="LOGIN"
          />
        </form>
        <div className='loginInfo'>
          <p>
            <strong>Note</strong>
            <br />
            To test this prototype, please find the login information bellow:
            <br />
            <br />
            <strong>LOGIN: </strong>
            test@gmail.com
            <br />
            <strong>PASSWORD: </strong>
            test123
          </p>
        </div>
      </div>
    );
  }
}
export default Login;
