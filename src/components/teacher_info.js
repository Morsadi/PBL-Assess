import React from "react";
import { Component } from "react";
import "firebase/database";

// import fire from '../config/config'

class Teacher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayContent: "block",
      showMessage: "none",
      displayMessage: "none",
      message: "",
      displayBtns: ""
    };
  }

  // push the new data to firebase
  update() {
    if (this.props.teacher.name !== "") {
      this.props.teacherRef.update({
        full_name: this.props.teacher.name
          ? this.props.teacher.name
          : "Unknown",
        age: this.props.teacher.age ? this.props.teacher.age : "",
        gender: this.props.teacher.gender ? this.props.teacher.gender : "",
        email: this.props.teacher.email ? this.props.teacher.email : "",
        phone: this.props.teacher.phone ? this.props.teacher.phone : "",
        country: this.props.teacher.country ? this.props.teacher.country : ""
      });

      //show the confirmation message
      this.setState({
        showMessage: "block"
      });
      //hide the confirmation message
      this.interval = setTimeout(() => {
        this.setState({
          showMessage: "none"
        });
      }, 3000);
    }
  }

  //delete teacher
  removeteacher() {
    if (this.props.teacherRef) {
      this.props.teacherRef.remove();

      //Clear parent state after deleting the last teacher on the list
      if (this.props.teachers.length === 1) {
        this.props.clearteachers();
        this.props.toggleProfile(false);
      }

      //select next teacher the current is deleted
      this.last = setTimeout(() => {
        const lastTeacher = document.getElementsByClassName("teacherList")[
          document.getElementsByClassName("teacherList").length - 1
        ];
        if (lastTeacher) {
          lastTeacher.click();
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
      this.props.teacher.name +
      " from the list?";

    const firstteacher = document.getElementsByClassName("teacherList")[
      document.getElementsByClassName("teacherList").length - 1
    ];

    if (firstteacher) {
      this.setState({
        displayContent: "none",
        message: msg,
        displayMessage: "block"
      });
    }
  }

  //close the confirmation section after deleting the teacher
  closeMsg() {
    this.setState({
      displayContent: "block",
      displayMessage: "none"
    });
  }

  //btn hovers
  hoverOn(e) {
    if (this.props.teacher.id) {
      e.target.style.background = "#AB3F3F";
      e.target.style.color = "white";
    }
  }
  hoverOff(e) {
    if (this.props.teacher.id) {
      e.target.style.background = "none";
      e.target.style.color = this.props.style.text_color;
    }
  }

  //unmount intervals
  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.last);
  }

  render() {
    return (
      <div style={{ textAlign: "center", color: this.props.style.text_color }}>
        <div style={{ display: this.state.displayContent }}>
          <div className="parentFlex">
            <div className="flex">
              <h3 className="items keys">Full Name</h3>

              <input
                type="text"
                onChange={e => {
                  const { target } = e;
                  let name = target.value;
                  //capitalize first letter of each word
                  name = name
                    .toLowerCase()
                    .split(" ")
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(" ");
                  this.props.updateTeacher("name", name);
                }}
                value={this.props.teacher.name}
                placeholder=""
                style={{ color: this.props.style.text_color }}
              />
            </div>
            <div className="flex">
              <h3 className="items keys">Age</h3>

              <input
                maxLength="2"
                type="text"
                style={{ color: this.props.style.text_color }}
                onChange={e => {
                  const { target } = e;
                  let age = target.value;

                  if (!isNaN(age)) {
                    this.props.updateTeacher("age", age);
                  }
                }}
                value={this.props.teacher.age}
                placeholder=""
              />
            </div>
            <div className="flex">
              <h3 className="items keys">Gender</h3>

              <input
                style={{ color: this.props.style.text_color }}
                type="text"
                onChange={e => {
                  const { target } = e;
                  let gender = target.value;
                  //capitalize first letter ;
                  gender = gender.charAt(0).toUpperCase() + gender.substring(1)
                  this.props.updateTeacher("gender", gender);
                }}
                value={this.props.teacher.gender}
                placeholder=""
              />
          </div>
            </div>

          <div className="parentFlex2">
            <div className="flex">
              <h3 className="items keys">Phone Number </h3>

              <input
                style={{ color: this.props.style.text_color }}
                type="text"
                maxLength="10"
                onChange={e => {
                  const { target } = e;
                  let phone = target.value;

                  if (!isNaN(phone)) {
                    this.props.updateTeacher("phone", phone);
                  }
                }}
                value={this.props.teacher.phone}
                placeholder=""
              />
            </div>
            <div className="flex">
              <h3 className="items keys">Country</h3>

              <input
                style={{ color: this.props.style.text_color }}
                type="text"
                onChange={e => {
                  const { target } = e;
                  let country = target.value;
                  //capitalize first letter of each word
                  country = country
                    .toLowerCase()
                    .split(" ")
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(" ");
                  this.props.updateTeacher("country", country);
                }}
                value={this.props.teacher.country}
                placeholder=""
              />
            </div>
            <div className="flex">
              <h3 className="items keys">Email</h3>

              <input
                style={{ color: this.props.style.text_color }}
                type="text"
                onChange={e => {
                  const { target } = e;
                  const email = target.value;
                  this.props.updateTeacher("email", email);
                }}
                value={this.props.teacher.email}
                placeholder=""
              />
            </div>
          </div>

          <button
            style={{
              color: this.props.style.btn_text,
              background: this.props.style.btn_color
            }}
            onClick={this.update.bind(this)}
            className="submit"
            id="updateBtn"
          >
            Update
          </button>

          <br />
          <button
            style={{ color: this.props.style.text_color }}
            onClick={this.comfirmDeletion.bind(this)}
            className="delete"
            id="confirmBtn"
            onMouseEnter={this.hoverOn.bind(this)}
            onMouseLeave={this.hoverOff.bind(this)}
          >
            Delete
          </button>

          <h2
            className="updateMessage"
            style={{ display: this.state.showMessage }}
          >
            <strong>{this.props.teacher.name} </strong> has been updated
          </h2>
        </div>
        {/* display when click on first delete to comfirm deletion */}
        <div
          className="msgContainer"
          style={{ display: this.state.displayMessage }}
        >
          <h4>{this.state.message}</h4>

          <button
            style={{ color: this.props.style.text_color }}
            onClick={this.removeteacher.bind(this)}
            className="delete"
            onMouseEnter={this.hoverOn.bind(this)}
            onMouseLeave={this.hoverOff.bind(this)}
          >
            Delete
          </button>
          <button
            style={{ color: this.props.style.text_color }}
            className="return"
            onClick={this.closeMsg.bind(this)}
          >
            Return
          </button>
        </div>
      </div>
    );
  }
}

export default Teacher;
