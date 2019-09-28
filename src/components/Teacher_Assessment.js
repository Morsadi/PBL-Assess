import React, { Component } from 'react';
import TableData from './tableData';
import 'firebase/database';
import 'firebase/storage';

class TeacherAssessment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMessage: 'none',
    };
  }

  componentDidMount() {
    this.load()

  }

  // clear interval
  componentWillUnmount() {
    clearTimeout(this.hideMsg);
    clearTimeout(this.reload)
  }

  load = () => {
    const { teacherRef } = this.props;
    // onload, import the ids of the checkboxes stored in firebase and activate them in DOM

    teacherRef.once('value', data => {
      const teacher = data.val();

      const { boxes } = teacher;

      if (boxes) {
        boxes.map((box) => {
          const input = document.getElementById(box)
          input.checked = true;
          return false
        })
      }

      
    });

  }


  updateBoxes = () => {

    const { teacher, teacherRef } = this.props;

    // if teacher is active and update button is clicked, loop through all the checkboxes and push then to one array
    if (teacher.id) {
      const boxes = document.getElementsByClassName('boxes');

      const boxesChecked = [];

      Object.keys(boxes).map((box) => (
        boxes[box].checked ? boxesChecked.push(boxes[box].id) : null
      ))

      // push the array to firebase
      teacherRef.update({
        boxes: boxesChecked,
      });

      // show msg when update
      this.setState({
        showMessage: '',
      });

      // hide msg when update
      this.hideMsg = setTimeout(() => {
        this.setState({
          showMessage: 'none',
        });
        this.load()
      }, 3000);
    }

    this.reload = setTimeout(() => {

      this.load()
    }, 1)

  }

  render() {
    const { style } = this.props;
    const { showMessage } = this.state;
    return (
      <div style={{ textAlign: 'center', color: style.text_color }}>
        <h1 style={{ marginBottom: '80px' }}>PROJECT BASED TEACHING RUBRIC</h1>

        <table>
          <thead>
            <tr>
              {TableData[0].thead.map((head) => (
                <th className={head === ' ' ? 'hide' : ''} key={Math.random()}>{head || ' '}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* loop through each sequence */}
            {TableData[1].tbody.map(sequence =>
              sequence.descriptions.map((desc, descIndex) =>
                // if this is the very first value, add the head description that contains the rowspan feature, if not, add the rest without the head.
                // using Math.random() to generate keys just because there will be no reordering
                (descIndex === 0 ? (
                  <tr key={Math.random()}>
                    <td
                      key={Math.random()}
                      className='categories'
                      rowSpan={sequence.descriptions.length}
                    >
                      {sequence.head}
                    </td>
                    <td className='values' key={Math.random()}>
                      {desc}
                    </td>

                    <td key={Math.random()}>
                      <label>
                        <input
                          type='radio'
                          className='boxes'
                          name={sequence.ids[descIndex]}
                          id={sequence.ids[descIndex]}
                        />
                        <div />
                      </label>
                    </td>

                    <td key={Math.random()}>
                      <label>
                        <input
                          type='radio'
                          className='boxes'
                          name={sequence.ids[descIndex]}
                          id={sequence.ids[descIndex] + 1}
                        />
                        <div />
                      </label>
                    </td>

                    <td key={Math.random()}>
                      <label>
                        <input
                          type='radio'
                          className='boxes'
                          name={sequence.ids[descIndex]}
                          id={sequence.ids[descIndex] + 2}
                        />
                        <div />
                      </label>
                    </td>
                  </tr>
                ) : (
                  <tr key={Math.random()}>
                    <td className='values'>{desc}</td>

                    <td key={Math.random()}>
                      <label>
                        <input
                          type='radio'
                          className='boxes'
                          name={sequence.ids[descIndex]}
                          id={sequence.ids[descIndex]}
                          key={sequence.ids[descIndex]}
                        />
                        <div />
                      </label>
                    </td>

                    <td key={Math.random()}>
                      <label>
                        <input
                          type='radio'
                          className='boxes'
                          name={sequence.ids[descIndex]}
                          id={sequence.ids[descIndex] + 1}
                        />
                        <div />
                      </label>
                    </td>

                    <td key={Math.random()}>
                      <label>
                        <input
                          type='radio'
                          className='boxes'
                          name={sequence.ids[descIndex]}
                          id={sequence.ids[descIndex] + 2}
                        />
                        <div />
                      </label>
                    </td>
                  </tr>
                )),
              ),
            )}
          </tbody>
        </table>

        <h2 className='updateMessage' style={{ display: showMessage }}>
          Assessment has been updated
        </h2>
        <button
          type='button'
          id='docUpdatebtn'
          style={{
            color: style.btn_text,
            background: style.btn_color,
          }}
          onClick={this.updateBoxes}
          className='submit'
        >
          Update
        </button>
      </div>
    );
  }
}

export default TeacherAssessment;
