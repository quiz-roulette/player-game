import React from 'react';

function Question(props) {

  return (
    <div><h2 className="question">{props.content}</h2>
    { props.image ? <img className="questionimage" src={props.image} /> : ""}
    </div>
  );

}

// Question.propTypes = {
//   content: React.PropTypes.string.isRequired
// };

export default Question;
