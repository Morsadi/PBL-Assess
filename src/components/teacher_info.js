import React from "react";
import { Component } from "react";
import "firebase/database";


// import fire from '../config/config'


class Teacher extends Component {
  constructor(props) {
    super(props);

//binding functions 
this.handleChange = this.handleChange.bind(this)


    this.state = {
      displayContent: "block",
      id: "",
      name_input: "",
      age_input: "",
      gender_input: "",
      email_input: "",
      phone_input: "",
      country_input: "",
      fn: "",
      showMessage: "none",
      displayMessage: "none",
      message: "",
      displayBtns: ""
    };
  }

 

  //store props in this component's state
  componentWillReceiveProps(props) {
    this.setState({
      id: props.teacher_id,
      name_input: props.current_teacher,
      age_input: props.current_age,
      gender_input: props.current_gender,
      email_input: props.current_email,
      phone_input: props.current_phone,
      country_input: props.current_country,
      fn: props.teacherRef
    });
  }

  //syncing all inputs with the state
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

// push the new data to firebase
  update() {
if (this.state.name_input){



    this.props.teacherRef.update({
      full_name: this.state.name_input ? this.state.name_input : "",
      age: this.state.age_input ? this.state.age_input : "",
      gender: this.state.gender_input ? this.state.gender_input : "",
      email: this.state.email_input ? this.state.email_input : "",
      phone: this.state.phone_input
        ? this.state.phone_input
        : "",
      country: this.state.country_input ? this.state.country_input : ""
    });

    const clickedteacher = document.getElementById(this.state.id);
    if (clickedteacher) {
      clickedteacher.click();
    }
  }
  this.setState({
    showMessage: 'block'
  })
  
  this.interval = setTimeout(()=>{
    this.setState({
    showMessage: 'none'
  })
  }, 3000)
  }

  //delete teacher, hide confirmation section and show
  removeteacher() {
    if (this.state.fn) {

      this.state.fn.remove();

      //Clear parent state after deleting the last teacher on the list

      if (this.props.state.length === 1) {
       this.props.clearteachers();
       this.props.toggleProfile(false)
      }

      //if last 
      this.last = setTimeout(() => {
        const firstteacher = document.getElementsByClassName("teacherList")[document.getElementsByClassName("teacherList").length -1];
        if (firstteacher) {
          firstteacher.click();
       } 
      }, 850);
    }

    //go back to the update page
    this.setState({
      displayContent: "block",
      displayMessage: "none"
    });


  }

  //show confirm section before delete is complete and hide info section
  comfirmDeletion() {

    let msg =
      "Are you sure you want to delete " +
      this.state.name_input +
      " from the list?";

    const firstteacher = document.getElementsByClassName("teacherList")[
      document.getElementsByClassName("teacherList").length - 1];

      
    if (firstteacher) {
      this.setState({
        displayContent: "none",
        message: msg,
        displayMessage: "block"
      })
      
    }

  }

  //to close the delete section after deleting the teacher
  closeMsg() {
    this.setState({
      displayContent: "block",
      displayMessage: "none"
    });
  }

  hoverOn(e){
if (this.state.id){
  e.target.style.background = '#AB3F3F';
  e.target.style.color = 'white'
}
 

  }
hoverOff(e){
  if (this.state.id){
    e.target.style.background = 'none'
    e.target.style.color = this.props.text_color;
  }
 
}


componentWillUnmount(){
clearInterval(this.interval)
clearInterval(this.last)
}
  render() {
    return (
      <div style={{ textAlign: "center", color: this.props.text_color }}>
        <div style={{ display: this.state.displayContent }}>
          <div className="parentFlex">
            <div className="flex">
              <h3 className="items keys">Full Name</h3>

              <input
                type="text"
                onChange={this.handleChange}
                value={this.state.name_input}
                placeholder=""
                name='name_input'
                style={{color: this.props.text_color }}
              />
            </div>
            <div className="flex">
              <h3 className="items keys">Age</h3>

              <input
              style={{color: this.props.text_color }}
                type="text"
                onChange={this.handleChange}
                value={this.state.age_input}
                placeholder=""
                name="age_input"
              />
            </div>
            <div className="flex">
              <h3 className="items keys">Gender</h3>

              <input
              style={{color: this.props.text_color }}
                type="text"
                onChange={this.handleChange}
                value={this.state.gender_input}
                placeholder=""
                name="gender_input"
              />
            </div>
          </div>

          <div className="parentFlex2">
            <div className="flex">
              <h3 className="items keys">Phone Number </h3>

              <input
              style={{color: this.props.text_color }}
                type="text"
                onChange={this.handleChange}
                value={this.state.phone_input}
                placeholder=""
                name="phone_input"
              />
            </div>
            <div className="flex">
              <h3 className="items keys">Country</h3>

              <input
              style={{color: this.props.text_color }}
                type="text"
                onChange={this.handleChange}
                value={this.state.country_input}
                placeholder=""
                name='country_input'
              />
            </div>
            <div className="flex">
              <h3 className="items keys">Email</h3>

              <input
              style={{color: this.props.text_color }}
                type="text"
                onChange={this.handleChange}
                value={this.state.email_input}
                placeholder=""
                name="email_input"
              />
            </div>
          </div>

          <button style={{color: this.props.btn_text, background: this.props.btn_color }} onClick={this.update.bind(this)} className="submit"  id="updateBtn">
            Update
          </button>
          
          <br />
          <button style={{color: this.props.text_color }} onClick={this.comfirmDeletion.bind(this)} className="delete" id='confirmBtn' onMouseEnter={this.hoverOn.bind(this)} onMouseLeave={this.hoverOff.bind(this)} >
            Delete
          </button>
          <h2 className='updateMessage' style={{display : this.state.showMessage}}><strong>{this.state.name_input} </strong> has been updated</h2>
        </div>
        {/* display when click on first delete to comfirm deletion */}
        <div
          className="msgContainer"
          style={{ display: this.state.displayMessage }}
        >
          <h4>{this.state.message}</h4>
          <button style={{color: this.props.text_color }} onClick={this.removeteacher.bind(this)} className="delete" onMouseEnter={this.hoverOn.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>
            Delete
          </button>
          <button style={{color: this.props.text_color }} className='return' onClick={this.closeMsg.bind(this)}>Return</button>


        </div>
      </div>
    );
  }
}

export default Teacher;
