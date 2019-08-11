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
  user: {},
  userId: '',
  isMobile: false
}

this.authListener = this.authListener.bind(this)
  }



  componentDidMount(){
    this.authListener();
    if(window.innerWidth <= 600){
      this.setState({
        isMobile: true
      })
    }
  }

  

  
authListener(){






fire.auth().onAuthStateChanged((user)=>{
    if (user){
      this.setState({user: user, userId: user.uid});


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
      
      !this.state.isMobile?
      <div>

          {this.state.user? <Home user={this.state.user} />:<Login />}


      </div>:<div className='mobileVersion'><h2>Mobile version coming soon.</h2></div>
    );
  }
}

export default App;
