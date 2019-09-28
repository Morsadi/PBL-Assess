import React from "react";
import { Component } from "react";
import fire from "./config/config";
import Home from "./components/home";
import Login from "./login";
import "firebase/auth";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      userId: "",
      isMobile: false
    };

    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
    if (window.innerWidth <= 600) {
      this.setState({
        isMobile: true
      });
    }
  }

  componentWillUnmount() {
    this.fireBaseListener();
  }

  authListener() {
    this.fireBaseListener = fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user, userId: user.uid });
      } else {
        this.setState({ user: null });
      }
    });
  }

 

  render() {
    const { isMobile, user } = this.state;

    return !isMobile ? (<div>{user ? <Home /> : <Login />}</div>) : 
      (
        <div className="mobileVersion">
          <h2>Mobile version coming soon.</h2>
        </div>
      );
  }
}

export default App;
