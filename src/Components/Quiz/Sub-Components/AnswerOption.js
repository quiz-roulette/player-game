import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';

function AnswerOption(props) {
  var backgroundColor;  
  /**
   * answer (correct answer)
   * answerSelected (what user chose)
   */
  if (props.answer === props.answerId) {
    backgroundColor = "#99ff99"
  }
  else if (props.answerSelected === props.answerId) {
    backgroundColor = "#B2B2B2"
  }
  return (
    <Col sm={6} md={3} className="answerOption" style={{
      backgroundColor: backgroundColor
    }}>
      <input type="radio"
        className="radioCustomButton"
        name="radioGroup"
        id={props.answerId}
        value={props.answerId}
        onChange={props.onAnswerSelected}
        disabled={props.answer !== -1}
      />
      <label className="radioCustomLabel" htmlFor={props.answerId}>
        {props.answerContent}
      </label>
    </Col>
  );

}

// AnswerOption.propTypes = {
//   answerType: React.PropTypes.string.isRequired,
//   answerContent: React.PropTypes.string.isRequired,
//   answer: React.PropTypes.string.isRequired,
//   onAnswerSelected: React.PropTypes.func.isRequired
// };

export default AnswerOption;
