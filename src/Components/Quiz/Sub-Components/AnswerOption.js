import React from 'react';

function AnswerOption(props) {
  return (
    <li className="answerOption">
      <input
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
        checked={props.answerId === props.answer}
        id={props.answerId}
        value={props.answerId}
        disabled={props.answer !== -1}
        onChange={props.onAnswerSelected}
      />
      <label className="radioCustomLabel" htmlFor={props.answerId}>
        {props.answerContent}
      </label>
    </li>
  );

}

// AnswerOption.propTypes = {
//   answerType: React.PropTypes.string.isRequired,
//   answerContent: React.PropTypes.string.isRequired,
//   answer: React.PropTypes.string.isRequired,
//   onAnswerSelected: React.PropTypes.func.isRequired
// };

export default AnswerOption;
