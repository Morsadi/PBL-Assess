import React, { Component } from 'react';
import 'firebase/auth';
import 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faMoon,
  faSun,
  faFileAlt,
  faUser,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import fire from '../config/config';
import Teacher from './teacher_info';
import TeacherAssessment from './Teacher_Assessment';
import { About } from './about';

const CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowHeight: window.innerHeight,
      teachers: [],
      addTeacherInput: '',
      style: {
        bg_color: '#2F2F2F',
        body_color: '#4B4B4B',
        navBar_color: '#4B4B4B',
        text_color: '#fff',
        icon_color: '#C4C4C4',
        input_bgColor: '#2F2F2F',
        btn_color: 'none',
        btn_text: '#B0B0B0',
        btn_hover_color: '#B0B0B0',
        active_opacity: '1',
        none_active_opacity: '0.4',
      },
      teacher: {
        id: '',
        name: '',
        gender: '',
        age: '',
        phone: '',
        email: '',
        country: '',
      },
      isProfileActive: false,
      isDocActive: false,
      isHomeActive: true,
      isItNight: true,
      isItDay: false,
      userId: '',
    };

    // binding functions

    //----------
  }

  componentDidMount() {
    this.loadData();
  }

  // unmout events when logout
  componentWillUnmount() {
    this.authListener();
  }

  // event handling for the child component
  updateTeacher = (property, value) => {
    const { teacher } = this.state;
    this.setState({
      teacher: {
        ...teacher,
        [property]: value,
      },
    });
  };

  // add teacher when click on Enter
  onEnterPress = e => {
    if (e === 'Enter') {
      e.preventDefault();
      this.submit();
    }
  };

  // fetching the saved teachers onlaod
  loadData = () => {
    // if logged in, fetch data based on the user id
    this.authListener = fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.database = fire.database().ref(`${user.uid}/teachersInfo`);

        this.setState({
          userId: user.uid,
        });

        // disable delete btn onload
        const confirmBtn = document.getElementById('confirmBtn');
        const updateBtn = document.getElementById('updateBtn');

        if (confirmBtn) {
          confirmBtn.disabled = true;
        }
        if (updateBtn) {
          updateBtn.disabled = true;
        }

        this.database.on('value', data => {
          const teachers = data.val();
          const teacherList = [];
          // loop through teachers using keys
          if (teachers) {
            const keys = Object.keys(teachers);

            for (let i in keys) {
              let individualKey = keys[i];

              teacherList.push({
                id: individualKey,
                name: teachers[individualKey].full_name,
              });
            }

            this.setState({
              teachers: teacherList,
            });
          }
        });
      }
    });
  };

  // sync input
  updateTeacherInput = event => {
    let { value } = event.target;

    // capitalize first letter of each word
    value = value
      .toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');

    this.setState({
      addTeacherInput: value,
    });
  };

  // push the new teacher to the database
  addteacher = e => {
    const { addTeacherInput } = this.state;
    e.preventDefault();
    this.database.push().set({
      full_name: addTeacherInput,
      age: '',
      gender: '',
      phone: '',
      email: '',
      country: '',
    });
    // reset input
    this.setState({
      addTeacherInput: '',
    });

    setTimeout(() => {
      const allteacher = document.getElementsByClassName('teacherList');
      const lastteacher = allteacher[allteacher.length - 1];
      lastteacher.click();
    }, 500);
  };

  // Press name to collect and display data
  fetch = e => {
    // enable delete btn after selecting a teacher
    const confirmBtn = document.getElementById('confirmBtn');
    const updateBtn = document.getElementById('updateBtn');

    if (confirmBtn) {
      confirmBtn.disabled = false;
      updateBtn.disabled = false;
    }

    this.setState({
      isProfileActive: true,
      isDocActive: false,
      isHomeActive: false,
    });
    const index = e.target.id;
    setTimeout(() => {
      this.database.once('value', e => {
        const teacher = e.val()[index];

        const teacherName = teacher.full_name;
        const { age } = teacher;
        const { gender } = teacher;
        const { email } = teacher;
        const { phone } = teacher;
        const { country } = teacher;

        this.setState({
          // using Object Literal Shorthand Syntax
          teacher: {
            id: index,
            name: teacherName,
            age,
            gender,
            email,
            phone,
            country,
          },
        });
      });
    }, 10);
  };

  // show profile section
  showProfile = () => {
    const { teacher } = this.state;
    this.setState({
      isProfileActive: true,
      isDocActive: false,
      isHomeActive: false,
    });

    // display the current teacher when press profile
    const clickedteacher = document.getElementById(teacher.id);
    setTimeout(() => {
      if (clickedteacher) {
        clickedteacher.click();
      }
    }, 100);
  };

  // show grades section
  showDoc = () => {
    this.setState({
      isProfileActive: false,
      isDocActive: true,
      isHomeActive: false,
    });
  };

  // show home section
  showHome = () => {
    this.setState({
      isProfileActive: false,
      isDocActive: false,
      isHomeActive: true,
    });
  };

  // funtion is passed to the delete button in order to clear
  // the teachers when all of them are deleted from the database
  clearteachers = () => {
    this.setState({
      teacher: {
        id: '',
        name: '',
        gender: '',
        age: '',
        phone: '',
        email: '',
        country: '',
      },
      teachers: [],
    });
  };

  // hide and show when deleting teachers
  toggleProfile = val => {
    this.setState({
      isProfileActive: val,
    });
  };

  logOut = () => {
    fire.auth().signOut();
  };

  bringDay = () => {
    const { style } = this.state;
    this.setState({
      style: {
        ...style,
        bg_color: '#BFBFBF',
        body_color: '#FFFFFF',
        navBar_color: '#6290C3',
        text_color: '#727272',
        icon_color: '#FFFFFF',
        input_bgColor: '#e6e6e6',
        btn_color: '#6290C3',
        btn_text: '#fff',
      },

      isItDay: true,
      isItNight: false,
    });
  };

  bringNight = () => {
    const { style } = this.state;
    this.setState({
      style: {
        ...style,
        bg_color: '#2F2F2F',
        body_color: '#4B4B4B',
        navBar_color: '#4B4B4B',
        text_color: '#fff',
        icon_color: '#C4C4C4',
        input_bgColor: '#2F2F2F',
        btn_color: 'none',
        btn_text: '#B0B0B0',
      },

      isItDay: false,
      isItNight: true,
    });
  };

  // update
  render() {
    const {
      windowHeight,
      style,
      addTeacherInput,
      isItDay,
      isItNight,
      isDocActive,
      isHomeActive,
      isProfileActive,
      teachers,
      teacher,
      userId,
    } = this.state;

    return (
      <div
        style={{
          height: windowHeight,
          background: style.bg_color,
          color: style.text_color,
        }}
        className="grid"
      >
        <div style={{ background: style.body_color }} className="teacher_input">
          <form>
            <input
              style={{
                color: style.text_color,
                background: style.input_bgColor,
              }}
              onKeyDown={this.onEnterPress}
              onChange={this.updateTeacherInput.bind(this)}
              value={addTeacherInput}
              type="textArea"
              placeholder="New teacher"
            />
            <button type="submit" onClick={this.addteacher}>
              add
            </button>
          </form>
        </div>

        <div style={{ background: style.navBar_color }} className="controls">
          <div className="leftControls">
            <FontAwesomeIcon
              style={{
                opacity: isHomeActive
                  ? style.active_opacity
                  : style.none_active_opacity,
                color: style.icon_color,
              }}
              onClick={this.showHome}
              className="fas home"
              icon={faHome}
            />
            <FontAwesomeIcon
              style={{
                opacity: isItNight
                  ? style.active_opacity
                  : style.none_active_opacity,
                color: style.icon_color,
              }}
              className="fas night"
              icon={faMoon}
              onClick={this.bringNight}
            />
            <FontAwesomeIcon
              style={{
                opacity: isItDay
                  ? style.active_opacity
                  : style.none_active_opacity,
                color: style.icon_color,
              }}
              className="fas day"
              icon={faSun}
              onClick={this.bringDay}
            />
          </div>

          <div className="centralControls">
            <FontAwesomeIcon
              style={{
                opacity: isProfileActive
                  ? style.active_opacity
                  : style.none_active_opacity,
                color: style.icon_color,
              }}
              onClick={this.showProfile}
              className="fas profile"
              icon={faUser}
              id="profile"
            />
            <FontAwesomeIcon
              style={{
                opacity: isDocActive
                  ? style.active_opacity
                  : style.none_active_opacity,
                color: style.icon_color,
              }}
              onClick={this.showDoc}
              className="fas file"
              icon={faFileAlt}
            />
          </div>

          <FontAwesomeIcon
            onClick={this.logOut}
            className="fas signOutAlt"
            icon={faSignOutAlt}
            style={{
              opacity: isProfileActive
                ? style.active_opacity
                : style.none_active_opacity,
              color: style.icon_color,
            }}
          />
        </div>

        <div
          style={{ background: style.body_color }}
          className="teachers_column"
        >
          <CSSTransitionGroup
            transitionName="fadeIn"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {teachers.map((e, key) => (
              <p
                key={key}
                onClick={this.fetch}
                ref={this.remoteClick}
                className={
                  teacher.id === e.id ? 'active teacherList' : 'teacherList'
                }
                id={e.id}
              >
                {e.name}
              </p>
            ))}
          </CSSTransitionGroup>
        </div>

        <div
          style={{
            background: style.body_color,
            borderColor: style.body_color,
          }}
          className="teacher_info"
        >
          {isProfileActive ? (
            <Teacher
              updateTeacher={this.updateTeacher}
              teacher={teacher}
              teacherRef={fire
                .database()
                .ref(`${userId}/teachersInfo/${teacher.id}`)}
              database={fire.database().ref(`${userId}/teachersInfo`)}
              teachers={teachers}
              clearteachers={this.clearteachers}
              toggleProfile={this.toggleProfile}
              style={style}
            />
          ) : null}

          {isDocActive ? (
            <TeacherAssessment
              teacherRef={fire
                .database()
                .ref(`${userId}/teachersInfo/${teacher.id}`)}
              teacher={teacher}
              database={fire.database().ref(`${userId}/teachersInfo`)}
              style={style}
            />
          ) : null}

          {isHomeActive ? <About style={style} /> : null}
        </div>
      </div>
    );
  }
}

export default Home;
