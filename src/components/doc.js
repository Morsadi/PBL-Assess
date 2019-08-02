
import React from 'react';
import { Component } from 'react';
// import firebase from 'firebase/app';
import 'firebase/database'; 
import 'firebase/storage';


class Doc extends Component {
constructor(props){
  super(props)

this.state={
  showMessage: 'none'
}

  //bind functions


  this.updateBoxes = this.updateBoxes.bind(this)
  
}
//63a3d9f36f66bf2e6fe44c3a9a359d027edd9b83




componentDidMount() {
  this.props.teacherRef.once("value", data => {


    const teacher = data.val();
    if(teacher){
    const boxes = teacher.boxes;

    for (let i in boxes){
      let boxId = boxes[i]
      const input = document.getElementById(boxId);

      input.checked = true;

    }
  
  }
  });
 
}




updateBoxes(){

if (this.props.teacher_id){
const boxes = document.getElementsByClassName('boxes');

let boxesChecked = []
for (let i in boxes){
  if (boxes[i].checked){

    boxesChecked.push(boxes[i].id)
  }
  
}
this.props.teacherRef.update({

    boxes: boxesChecked

  })

  this.setState({
    showMessage: ''
  })
 

}




}


  render() {

    
    
      return (
        <div style={{textAlign: 'center',color: this.props.text_color}}>

<h1 style={{marginBottom: '80px'}}>PROJECT BASED EDUCATOR ASSESEMENT</h1>
<table >
  <thead>
    
    <tr>
      <th className='hide'></th>
      <th className='hide'></th>
      <th>Novice </th>
      <th>Specialist</th>
      <th>Master</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="categories" rowSpan="3">Design and
Plan</td>
      <td className='values'>Project includes all Essential Project
Design Elements as described on the
Project Design Rubric.</td>
      <td><label><input type="radio" className="boxes" id='1' name="one" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='2' name="one" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='3' name="one" /><div></div></label></td>
    </tr>
    
    <tr>
      <td className='values'>Plans are detailed and include
scaffolding and assessing student
learning and a project calendar, which
remains flexible to meet student needs.</td>
      <td><label><input type="radio" className="boxes" id='4' name="two" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='5' name="two" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='6' name="two" /><div></div></label></td>
    </tr>
    
    <tr>
      <td className='values'>Resources for the project have been
anticipated to the fullest extent possible
and arranged well in advance.</td>
      <td><label><input type="radio" className="boxes" id='7' name="three" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='8' name="three" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='9' name="three" /><div></div></label></td>
    </tr>
  
    <tr>
      <td className="categories" rowSpan="2">Align to
Standards</td>
      <td className='values'>Criteria for products are clearly and
specifically derived from standards and
allows demonstration of mastery. </td>
     <td><label><input type="radio" className="boxes" id='10' name="four" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='11' name="four" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='12' name="four" /><div></div></label></td>
    </tr>
    
    <tr>
      <td className='values'>Scaffolding of student learning, critique
and revision protocols, assessments
and rubrics consistently refer to and
support student achievement of specific
standards.</td>
      <td><label><input type="radio" className="boxes" id='13' name="five" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='14' name="five" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='15' name="five" /><div></div></label></td>
    </tr>
    
     <tr>
      <td className="categories" rowSpan="6">Build the
Culture</td>
      <td className='values'>Norms to guide the classroom are
co-crafted with and self-monitored by
students.</td>
     <td><label><input type="radio" className="boxes" id='16' name="six" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='17' name="six" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='18' name="six" /><div></div></label></td>
    </tr>
    
    <tr>
      <td className='values'>Student voice and choice is regularly
leveraged and ongoing, including
identification of real-world issues and
problems students want to address in
projects. </td>
      <td><label><input type="radio" className="boxes" id='19' name="seven" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='20' name="seven" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='21' name="seven" /><div></div></label></td>
    </tr>
    
     <tr>
      <td className='values'>Students usually know what they need
to do with minimal direction from the
teacher.</td>
      <td><label><input type="radio" className="boxes" id='22' name="eight" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='23' name="eight" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='24' name="eight" /><div></div></label></td>
    </tr>
    
     <tr>
      <td className='values'>Students work collaboratively in healthy,
high-functioning teams, much like
an authentic work environment; the
teacher rarely needs to be involved in
managing teams.</td>
      <td><label><input type="radio" className="boxes" id='25' name="nine" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='26' name="nine" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='27' name="nine" /><div></div></label></td>
    </tr>
    
    <tr>
      <td className='values'>Students understand there is no single
“right answer” or preferred way to do
the project, and that it is OK to take
risks, make mistakes, and learn from
them.</td>
      <td><label><input type="radio" className="boxes" id='28' name="ten" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='29' name="ten" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='30' name="ten" /><div></div></label></td>
    </tr>
    
    <tr>
      <td className='values'>The values of critique and revision,
persistence, rigorous thinking, and
pride in doing high-quality work are
shared, and students hold each other
accountable to them.</td>
      <td><label><input type="radio" className="boxes" id='31' name="eleven" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='32' name="eleven" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='33' name="eleven" /><div></div></label></td>
    </tr>
    
      <tr>
      <td className="categories" rowSpan="5">Manage
Activities</td>
        
      <td className='values'>The classroom features an appropriate
mixture of individual and team work
time, whole group and small group
instruction. </td>
     <td><label><input type="radio" className="boxes" id='34' name="twelve" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='35' name="twelve" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='36' name="twelve" /><div></div></label></td>
    </tr>
    
    <tr>
      <td className='values'>Classroom routines and norms are
consistently followed during project
work time to maximize productivity.</td>
      <td><label><input type="radio" className="boxes" id='37' name="thriteen" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='38' name="thriteen" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='39' name="thriteen" /><div></div></label></td>
    </tr>
    
    <tr>
      <td className='values'>Project management tools (group
calendar, contract, learning log, etc.)
are used to support student selfmanagement and independence.</td>
      <td><label><input type="radio" className="boxes" id='40' name="fourteen" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='41' name="fourteen" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='42' name="fourteen" /><div></div></label></td>
    </tr>
    
<tr>
      <td className='values'>Realistic schedules, checkpoints,
and deadlines are set but flexible; no
bottlenecks impede workflow.</td>
      <td><label><input type="radio" className="boxes" id='43' name="fifteen" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='44' name="fifteen" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='45' name="fifteen" /><div></div></label></td>
    </tr>
    
<tr>
      <td className='values'>Well-balanced teams are formed
according to the nature of the project
and student needs, with appropriate
student voice and choice.</td>
      <td><label><input type="radio" className="boxes" id='46' name="sixteen" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='47' name="sixteen" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='48' name="sixteen" /><div></div></label></td>
    </tr>
    
 <tr>
      <td className="categories" rowSpan="4">Scaffold
Student
Learning</td>
        
      <td className='values'>Each student receives necessary
instructional supports to access
content, skills, and resources; these
supports are removed when no longer
needed. </td>
     <td><label><input type="radio" className="boxes" id='49' name="seventeen" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='50' name="seventeen" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='51' name="seventeen" /><div></div></label></td>
    </tr>
    
    <tr>

    <td className='values'>Scaffolding is guided as much as possible
by students’ questions and needs; teacher
does not “front-load” too much information
at the start of the project, but waits until it
is needed or requested by students. </td>
     <td><label><input type="radio" className="boxes" id='52' name="eighteen" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='53' name="eighteen" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='54' name="eighteen" /><div></div></label></td>
    </tr>
    
    <tr>
      
      <td className='values'>Key success skills are taught using a
variety of tools and strategies; students are
provided with opportunities to practice and
apply them, and reflect on progress. </td>
     <td><label><input type="radio" className="boxes" id='55' name="nineteen" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='56' name="nineteen" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='57' name="nineteen" /><div></div></label></td>
    </tr>
    
    <tr>
      
      <td className='values'>Student inquiry is facilitated and
scaffolded, while allowing students to act
and think as independently as possible. </td>
     <td><label><input type="radio" className="boxes" id='58' name="twenty" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='100' name="twenty" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='59' name="twenty" /><div></div></label></td>
    </tr>
    
    
      
       <tr>
      <td className="categories" rowSpan="6">Assess
Student
Learning</td>
        
      <td className='values'>Project products and other sources of
evidence are used to thoroughly assess
subject-area standards as well as success
skills. </td>
     <td><label><input type="radio" className="boxes" id='60' name="twentyOne" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='61' name="thwentyOne" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='62' name="thwentyOne" /><div></div></label></td>
    </tr>
    
    <tr>
     <td className='values'>Individual student learning is adequately
assessed, not just team-created products. </td>
     <td><label><input type="radio" className="boxes" id='63' name="twentyTwo" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='64' name="twentyTwo" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='65' name="twentyTwo" /><div></div></label></td>
    </tr>

    <tr>
 <td className='values'>Formative assessment is used regularly
and frequently, with a variety of tools and
processes. </td>
     <td><label><input type="radio" className="boxes" id='66' name="twentyThree" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='67' name="twentyThree" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='68' name="twentyThree" /><div></div></label></td>
    </tr>

    <tr>
 <td className='values'>Structured protocols for critique and
revision are used regularly at checkpoints;
students give and receive effective
feedback to inform instructional decisions
and students’ actions. </td>
     <td><label><input type="radio" className="boxes" id='69' name="twentyFour" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='70' name="twentyFour" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='71' name="twentyFour" /><div></div></label></td>
    </tr>

    <tr>
 <td className='values'>Regular, structured opportunities are
provided for students to self-assess their
progress and, when appropriate, assess
peers on their performance. </td>
     <td><label><input type="radio" className="boxes" id='72' name="twentyFive" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='73' name="twentyFive" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='74' name="twentyFive" /><div></div></label></td>
    </tr>
    <tr>
 <td className='values'>Standards-aligned rubrics are used by
students and the teacher throughout
the project to guide both formative and
summative assessment.</td>
     <td><label><input type="radio" className="boxes" id='75' name="twentySix" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='76' name="twentySix" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='77' name="twentySix" /><div></div></label></td>
    </tr>
      
             <tr>
      <td className="categories" rowSpan="7">Engage and
Coach</td>
        
      <td className='values'>The teacher’s knowledge of individual
student strengths, interests,
backgrounds, and lives is used to
engage them in the project and inform
instructional decision-making. </td>
     <td><label><input type="radio" className="boxes" id='78' name="twentySeven" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='79' name="twentySeven" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='80' name="twentySeven" /><div></div></label></td>
    </tr>
    <tr>
     <td className='values'>Students and the teacher use standards
to co-define goals and benchmarks for
the project (e.g., by co-constructing a
rubric) in developmentally appropriate
ways. </td>
     <td><label><input type="radio" className="boxes" id='81' name="twentyEight" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='82' name="twentyEight" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='83' name="twentyEight" /><div></div></label></td>
    </tr>
    <tr>
 <td className='values'>Students’ enthusiasm and sense of
ownership of the project is maintained
by the shared nature of the work
between teachers and students.</td>
     <td><label><input type="radio" className="boxes" id='84' name="twentyNine" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='85' name="twentyNine" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='86' name="twentyNine" /><div></div></label></td>
    </tr>
    <tr>
 <td className='values'>Student questions play the central role
in driving the inquiry and product
development process; the driving
question is actively used to sustain
inquiry.</td>
     <td><label><input type="radio" className="boxes" id='87' name="Thirty" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='88' name="Thirty" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='89' name="Thirty" /><div></div></label></td>
    </tr>
    <tr>
 <td className='values'>Appropriately high expectations for the
performance of all students are clearly
established, shared, and reinforced by
teachers and students. </td>
     <td><label><input type="radio" className="boxes" id='90' name="ThirtyOne" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='91' name="ThirtyOne" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='92' name="ThirtyOne" /><div></div></label></td>
    </tr>
    <tr>
 <td className='values'>Individual student needs are identified
through close relationships built with
the teacher; needs are met not only by
the teacher but by students themselves
or other students, acting independently.</td>
     <td><label><input type="radio" className="boxes" id='93' name="ThirtyTwo" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='94' name="ThirtyTwo" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='95' name="ThirtyTwo" /><div></div></label></td>
    </tr>
    <tr>
      <td className='values'>Students and the teacher reflect
regularly and formally throughout the
project on what and how students are
learning (content and process); they
specifically note and celebrate gains and
accomplishments.</td>
     <td><label><input type="radio" className="boxes" id='96' name="ThirtyThree" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='97' name="ThirtyThree" /><div></div></label></td>
      <td><label><input type="radio" className="boxes" id='98' name="ThirtyThree" /><div></div></label></td>
    </tr>
      
      
  </tbody>
</table>

<h2 className='updateMessage' style={{display : this.state.showMessage}}> Assessment has been updated</h2>
<button id='docUpdatebtn' style={{color: this.props.btn_text, background: this.props.btn_color }} onClick={this.updateBoxes} className="submit">
            Update
          </button>
          

      </div>
    )
  }
};

export default Doc;

