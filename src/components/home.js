import React from "react";
import { Component } from "react";
import fire from "../config/config";
import "firebase/auth";
import "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMoon,
  faSun,
  faFileAlt,
  faUser,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import Teacher from "./teacher_info";
import TeacherAssessment from "./Teacher_Assessment";
import About from "./about";

const CSSTransitionGroup = require("react-transition-group/CSSTransitionGroup");
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowHeight: window.innerHeight,
      teachers: [],
      add_teacher_input: "",
      style: {
        bg_color: "#2F2F2F",
        body_color: "#4B4B4B",
        navBar_color: "#4B4B4B",
        text_color: "#fff",
        icon_color: "#C4C4C4",
        input_bgColor: "#2F2F2F",
        btn_color: "none",
        btn_text: "#B0B0B0",
        btn_hover_color: "#B0B0B0",
        active_opacity: "1",
        none_active_opacity: "0.4"
      },
      teacher: {
        id: "",
        name: "",
        gender: "",
        age: "",
        phone: "",
        email: "",
        country: ""
      },
      is_profile_active: false,
      is_doc_active: false,
      is_home_active: true,
      isIt_night: true,
      isIt_day: false,
      infoMsg: "",
      userId: ""
    };

    //binding functions

    this.addteacher = this.addteacher.bind(this);
    this.fetch = this.fetch.bind(this);
    this.clearteachers = this.clearteachers.bind(this);
    this.toggleProfile = this.toggleProfile.bind(this);
    this.loadData = this.loadData.bind(this);

    //----------
  }

  //event handling for the child component
  updateTeacher = (property, value) => {
    this.setState({
      ...this.state,
      teacher: {
        ...this.state.teacher,
        [property]: value
      }
    });
  };

  componentDidMount() {
    this.loadData();
  }

  //fetching the saved teachers onlaod
  loadData() {
    //if logged in, fetch data based on the user id
    this.authListener = fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.database = fire.database().ref(user.uid + "/teachersInfo");

        this.setState({
          userId: user.uid
        });

        //disable delete btn onload
        const confirmBtn = document.getElementById("confirmBtn");
        const updateBtn = document.getElementById("updateBtn");

        if (confirmBtn) {
          confirmBtn.disabled = true;
        }
        if (updateBtn) {
          updateBtn.disabled = true;
        }

        this.database.on("value", data => {
          const teachers = data.val();
          let teacherList = [];
          //loop through teachers
          if (teachers) {
            let keys = Object.keys(teachers);
            for (let i in keys) {
              let individualKey = keys[i];

              teacherList.push({
                id: individualKey,
                name: teachers[individualKey].full_name
              });
            }

            this.setState({
              teachers: teacherList
            });
          }
        });
      }
    });
  }

  //sync input
  update_teacher_input(event) {
    let value = event.target.value;

    //capitalize first letter of each word
    value = value
      .toLowerCase()
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");

    this.setState({
      add_teacher_input: value
    });
  }

  //push the new teacher to the database
  addteacher(e) {
    e.preventDefault();
    this.database.push().set({
      full_name: this.state.add_teacher_input,
      age: "",
      gender: "",
      phone: "",
      email: "",
      country: ""
    });
    //reset input
    this.setState({
      add_teacher_input: ""
    });

    setTimeout(() => {
      const allteacher = document.getElementsByClassName("teacherList");
      let lastteacher = allteacher[allteacher.length - 1];
      lastteacher.click();
    }, 500);
  }

  //add teacher when click on Enter
  onEnterPress = e => {
    if (e === "Enter") {
      e.preventDefault();
      this.submit();
    }
  };

  //selecting a teacher
  fetch(e) {
    //enable delete btn after selecting a teacher
    const confirmBtn = document.getElementById("confirmBtn");
    const updateBtn = document.getElementById("updateBtn");

    if (confirmBtn) {
      confirmBtn.disabled = false;
      updateBtn.disabled = false;
    }

    this.setState({
      is_profile_active: true,
      is_doc_active: false,
      is_home_active: false
    });
    const index = e.target.id;
    setTimeout(() => {
      this.database.once("value", e => {
        let teacher = e.val()[index];

        const teacher_name = teacher.full_name;
        const age = teacher.age;
        const gender = teacher.gender;
        const email = teacher.email;
        const phone = teacher.phone;
        const country = teacher.country;

        this.setState({
          teacher: {
            id: index,
            name: teacher_name,
            age: age,
            gender: gender,
            email: email,
            phone: phone,
            country: country
          }
        });
      });
    }, 10);

    //display the current teacher when press profile
  }

  //show profile section
  showProfile() {
    this.setState({
      is_profile_active: true,
      is_doc_active: false,
      is_home_active: false
    });

    //display the current teacher when press profile
    const clickedteacher = document.getElementById(this.state.teacher.id);
    setTimeout(() => {
      if (clickedteacher) {
        clickedteacher.click();
      }
    }, 100);
  }
  //show grades section
  showDoc() {
    this.setState({
      is_profile_active: false,
      is_doc_active: true,
      is_home_active: false
    });
  }
  //show home section
  showHome() {
    this.setState({
      is_profile_active: false,
      is_doc_active: false,
      is_home_active: true
    });
  }

  //funtion is passed to the delete button in order to clear the teachers when all of them are deleted from the database
  clearteachers() {
    this.setState({
      teacher: {
        id: "",
        name: "",
        gender: "",
        age: "",
        phone: "",
        email: "",
        country: ""
      },
      teachers: []
    });
  }

  //hide and show when deleting teachers
  toggleProfile(val) {
    this.setState({
      is_profile_active: val
    });
  }

  logOut() {
    fire.auth().signOut();
  }

  bringDay() {
    this.setState({
      style: {
        // using [...] to change only the new keys, otherwise it would replace the whole array wiht the new one, losing the old keys that werent addressed.
        ...this.state.style,
        bg_color: "#BFBFBF",
        body_color: "#FFFFFF",
        navBar_color: "#6290C3",
        text_color: "#727272",
        icon_color: "#FFFFFF",
        input_bgColor: "#e6e6e6",
        btn_color: "#6290C3",
        btn_text: "#fff"
      },

      isIt_day: true,
      isIt_night: false
    });
  }
  bringNight() {
    this.setState({
      style: {
        // using [...] to change only the new keys, otherwise it would replace the whole array wiht the new one, losing the old keys that werent addressed.
        ...this.state.style,
        bg_color: "#2F2F2F",
        body_color: "#4B4B4B",
        navBar_color: "#4B4B4B",
        text_color: "#fff",
        icon_color: "#C4C4C4",
        input_bgColor: "#2F2F2F",
        btn_color: "none",
        btn_text: "#B0B0B0"
      },

      isIt_day: false,
      isIt_night: true
    });
  }

  //unmout events when logout
  componentWillUnmount() {
    this.authListener();
  }

  // update
  render() {
    return (
      <div
        style={{
          height: this.state.windowHeight,
          background: this.state.style.bg_color,
          color: this.state.style.text_color
        }}
        className="grid"
      >
        <div
          style={{ background: this.state.style.body_color }}
          className="teacher_input"
        >
          <form>
            <input
              style={{
                color: this.state.style.text_color,
                background: this.state.style.input_bgColor
              }}
              onKeyDown={this.onEnterPress}
              onChange={this.update_teacher_input.bind(this)}
              value={this.state.add_teacher_input}
              type="textArea"
              placeholder="New teacher"
            />
            <button type="submit" onClick={this.addteacher}>
              add
            </button>
          </form>
        </div>

        <div
          style={{ background: this.state.style.navBar_color }}
          className="controls"
        >
          <div className="leftControls">
            <FontAwesomeIcon
              style={{
                opacity: this.state.is_home_active
                  ? this.state.style.active_opacity
                  : this.state.style.none_active_opacity,
                color: this.state.style.icon_color
              }}
              onClick={this.showHome.bind(this)}
              className="fas home"
              icon={faHome}
            />
            <FontAwesomeIcon
              style={{
                opacity: this.state.isIt_night
                  ? this.state.style.active_opacity
                  : this.state.style.none_active_opacity,
                color: this.state.style.icon_color
              }}
              className="fas night"
              icon={faMoon}
              onClick={this.bringNight.bind(this)}
            />
            <FontAwesomeIcon
              style={{
                opacity: this.state.isIt_day
                  ? this.state.style.active_opacity
                  : this.state.style.none_active_opacity,
                color: this.state.style.icon_color
              }}
              className="fas day"
              icon={faSun}
              onClick={this.bringDay.bind(this)}
            />
          </div>

          <div className="centralControls">
            <FontAwesomeIcon
              style={{
                opacity: this.state.is_profile_active
                  ? this.state.style.active_opacity
                  : this.state.style.none_active_opacity,
                color: this.state.style.icon_color
              }}
              onClick={this.showProfile.bind(this)}
              className="fas profile"
              icon={faUser}
              id="profile"
            />
            <FontAwesomeIcon
              style={{
                opacity: this.state.is_doc_active
                  ? this.state.style.active_opacity
                  : this.state.style.none_active_opacity,
                color: this.state.style.icon_color
              }}
              onClick={this.showDoc.bind(this)}
              className="fas file"
              icon={faFileAlt}
            />
          </div>

          <FontAwesomeIcon
            onClick={this.logOut.bind(this)}
            className="fas signOutAlt"
            icon={faSignOutAlt}
            style={{
              opacity: this.state.is_profile_active
                ? this.state.style.active_opacity
                : this.state.style.none_active_opacity,
              color: this.state.style.icon_color
            }}
          />
        </div>

        <div
          style={{ background: this.state.style.body_color }}
          className="teachers_column"
        >
          <CSSTransitionGroup
            transitionName="fadeIn"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {this.state.teachers.map((e, key) => {
              return (
                <p
                  key={key}
                  onClick={this.fetch}
                  ref={this.remoteClick}
                  className={
                    this.state.teacher.id === e.id
                      ? "active teacherList"
                      : "teacherList"
                  }
                  id={e.id}
                >
                  {e.name}
                </p>
              );
            })}
          </CSSTransitionGroup>
        </div>

        <div
          style={{
            background: this.state.style.body_color,
            borderColor: this.state.style.body_color
          }}
          className="teacher_info"
        >
          {this.state.is_profile_active ? (
            <Teacher
              updateTeacher={this.updateTeacher}
              teacher={this.state.teacher}
              teacherRef={fire
                .database()
                .ref(
                  this.state.userId + `/teachersInfo/${this.state.teacher.id}`
                )}
              database={fire
                .database()
                .ref(this.state.userId + "/teachersInfo")}
              teachers={this.state.teachers}
              clearteachers={this.clearteachers}
              toggleProfile={this.toggleProfile}
              style={this.state.style}
            />
          ) : null}

          {this.state.is_doc_active ? (
            <TeacherAssessment
              teacherRef={fire
                .database()
                .ref(
                  this.state.userId + `/teachersInfo/${this.state.teacher.id}`
                )}
              teacher={this.state.teacher}
              database={fire
                .database()
                .ref(this.state.userId + "/teachersInfo")}
              style={this.state.style}
            />
          ) : null}

          {this.state.is_home_active ? (
            <About style={this.state.style} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
