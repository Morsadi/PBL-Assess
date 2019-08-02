import React from "react";
import { Component } from "react";
import fire from "./config/config";
// import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

class Login extends Component {
    constructor(props) {
      super(props);
    
this.state = {
    email:'',
    password: ''

}

this.eventHandler = this.eventHandler.bind(this)
this.login = this.login.bind(this)
}

eventHandler(e){
    this.setState({
        [e.target.name]:e.target.value
    })
}

login(e){
e.preventDefault();
fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{

}).catch((error)=>{
    alert('User does not exist')
})

}
render(){

    return (
        <div className='login' style={{height: window.innerHeight, textAlign: 'center'}}>
<form>
<input onChange={this.eventHandler} value={this.state.email} type='email' placeholder='email' name='email' />
<input onChange={this.eventHandler} value={this.state.password} type='password' placeholder='password' name='password' />
<input id='loginBtn' onClick={this.login} type='submit' value='Submit' />
</form>


        </div>

    );
 }
}
export default Login;