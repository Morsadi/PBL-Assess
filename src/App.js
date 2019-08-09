import React from "react";
import { Component } from "react";
import fire  from "./config/config";
import Home from './components/home'
import Login from './login'
import "firebase/auth";

class App extends Component {
  constructor(props) {
    super(props);




this.state = {
  user: {}
}

this.authListener = this.authListener.bind(this)
  }

  componentDidMount(){
    this.authListener()
  }

authListener(){

fire.auth().onAuthStateChanged((user)=>{
    console.log(user);
    if (user){
      this.setState({user: user});


    }else {

      this.setState({user:null});

    }
  })
}

componentWillUnmount(){
this.authListener = undefined;
}

  render() {
    return (
      <div>

          {this.state.user? <Home />:<Login />}


      </div>
    );
  }
}

export default App;
