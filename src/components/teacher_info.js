import React, { Component } from 'react';

import 'firebase/database';

// import fire from '../config/config'

class Teacher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayContent: 'block',
      showMessage: 'none',
      displayMessage: 'none',
      message: '',
    };
  }

  // unmount intervals
  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.last);
  }

  // push the new data to firebase
  update() {
    // Destructuring props
    const { teacher, teacherRef } = this.props;

    if (teacher.name !== '') {
      teacherRef.update({
        full_name: teacher.name ? teacher.name : 'Unknown',
        age: teacher.age ? teacher.age : '',
        gender: teacher.gender ? teacher.gender : '',
        email: teacher.email ? teacher.email : '',
        phone: teacher.phone ? teacher.phone : '',
        country: teacher.country ? teacher.country : '',
      });

      // show the confirmation message
      this.setState({
        showMessage: 'block',
      });
      // hide the confirmation message
      this.interval = setTimeout(() => {
        this.setState({
          showMessage: 'none',
        });
      }, 3000);
    }
  }

  // delete teacher
  removeteacher() {
    // Destructuring props
    const { teachers, teacherRef, clearteachers, toggleProfile } = this.props;

    if (teacherRef) {
      teacherRef.remove();

      // Clear parent state after deleting the last teacher on the list
      if (teachers.length === 1) {
        clearteachers();
        toggleProfile(false);
      }

      // select next teacher the current is deleted
      this.last = setTimeout(() => {
        const lastTeacher = document.getElementsByClassName('teacherList')[
          document.getElementsByClassName('teacherList').length - 1
        ];
        if (lastTeacher) {
          lastTeacher.click();
        }
      }, 850);
    }

    // go back to the update page
    this.setState({
      displayContent: 'block',
      displayMessage: 'none',
    });
  }

  // show confirm section before delete is complete and hide info section
  comfirmDeletion() {
    const { teacher } = this.props;

    const msg = `Are you sure you want to delete ${teacher.name} from the list?`;

    const firstteacher = document.getElementsByClassName('teacherList')[
      document.getElementsByClassName('teacherList').length - 1
    ];

    if (firstteacher) {
      this.setState({
        displayContent: 'none',
        message: msg,
        displayMessage: 'block',
      });
    }
  }

  // close the confirmation section after deleting the teacher
  closeMsg() {
    this.setState({
      displayContent: 'block',
      displayMessage: 'none',
    });
  }

  // btn hovers
  hoverOn(e) {
    const { teacher } = this.props;

    if (teacher.id) {
      e.target.style.background = '#AB3F3F';
      e.target.style.color = 'white';
    }
  }

  hoverOff(e) {
    const { teacher, style } = this.props;
    if (teacher.id) {
      e.target.style.background = 'none';
      e.target.style.color = style.text_color;
    }
  }

  render() {
    const { style, updateTeacher, teacher } = this.props;
    const { displayContent, showMessage, displayMessage, message } = this.state;

    return (
      <div style={{ textAlign: 'center', color: style.text_color }}>
        <div style={{ display: displayContent }}>
          <div className="parentFlex">
            <div className="flex">
              <h3 className="items keys">Full Name</h3>

              <input
                type="text"
                onChange={e => {
                  const { target } = e;
                  let name = target.value;
                  // capitalize first letter of each word
                  name = name
                    .toLowerCase()
                    .split(' ')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');
                  updateTeacher('name', name);
                }}
                value={teacher.name}
                placeholder=""
                style={{ color: style.text_color }}
              />
            </div>
            <div className="flex">
              <h3 className="items keys">Age</h3>

              <input
                maxLength="2"
                type="text"
                style={{ color: style.text_color }}
                onChange={e => {
                  const { target } = e;
                  const age = target.value;
                  // eslint-disable-next-line no-restricted-globals
                  if (!isNaN(age)) {
                    updateTeacher('age', age);
                  }
                }}
                value={teacher.age}
                placeholder=""
              />
            </div>
            <div className="flex">
              <h3 className="items keys">Gender</h3>

              <input
                style={{ color: style.text_color }}
                type="text"
                onChange={e => {
                  const { target } = e;
                  let gender = target.value;
                  // capitalize first letter ;
                  gender = gender.charAt(0).toUpperCase() + gender.substring(1);
                  updateTeacher('gender', gender);
                }}
                value={teacher.gender}
                placeholder=""
              />
            </div>
          </div>

          <div className="parentFlex2">
            <div className="flex">
              <h3 className="items keys">Phone Number </h3>

              <input
                style={{ color: style.text_color }}
                type="text"
                maxLength="10"
                onChange={e => {
                  const { target } = e;
                  const phone = target.value;

                  // eslint-disable-next-line no-restricted-globals
                  if (!isNaN(phone)) {
                    updateTeacher('phone', phone);
                  }
                }}
                value={teacher.phone}
                placeholder=""
              />
            </div>
            <div className="flex">
              <h3 className="items keys">Country</h3>

              <input
                style={{ color: style.text_color }}
                type="text"
                onChange={e => {
                  const { target } = e;
                  let country = target.value;
                  // capitalize first letter of each word
                  country = country
                    .toLowerCase()
                    .split(' ')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');
                  updateTeacher('country', country);
                }}
                value={teacher.country}
                placeholder=""
              />
            </div>
            <div className="flex">
              <h3 className="items keys">Email</h3>

              <input
                style={{ color: style.text_color }}
                type="text"
                onChange={e => {
                  const { target } = e;
                  const email = target.value;
                  updateTeacher('email', email);
                }}
                value={teacher.email}
                placeholder=""
              />
            </div>
          </div>

          <button
            style={{
              color: style.btn_text,
              background: style.btn_color,
            }}
            onClick={this.update.bind(this)}
            className="submit"
            id="updateBtn"
            type="button"
          >
            Update
          </button>

          <br />
          <button
            style={{ color: style.text_color }}
            onClick={this.comfirmDeletion.bind(this)}
            className="delete"
            id="confirmBtn"
            onMouseEnter={this.hoverOn.bind(this)}
            onMouseLeave={this.hoverOff.bind(this)}
            type="button"
          >
            Delete
          </button>

          <h2 className="updateMessage" style={{ display: showMessage }}>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <strong>{teacher.name}</strong> has been updated
          </h2>
        </div>
        {/* display when click on first delete to comfirm deletion */}
        <div className="msgContainer" style={{ display: displayMessage }}>
          <h4>{message}</h4>

          <button
            style={{ color: style.text_color }}
            onClick={this.removeteacher.bind(this)}
            className="delete"
            onMouseEnter={this.hoverOn.bind(this)}
            onMouseLeave={this.hoverOff.bind(this)}
            type="button"
          >
            Delete
          </button>
          <button
            style={{ color: style.text_color }}
            className="return"
            onClick={this.closeMsg.bind(this)}
            type="button"
          >
            Return
          </button>
        </div>
      </div>
    );
  }
}

export default Teacher;
