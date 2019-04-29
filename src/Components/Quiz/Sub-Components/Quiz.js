import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Question, AnswerOption, QuestionCount, Progress } from './index'
import { Row, Col, Grid } from 'react-bootstrap';

function Quiz(props) {

  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key.ChoiceId}
        answerContent={key.Text}
        answerId={key.ChoiceId}
        // answerType={key.type}
        answer={props.answer}
        questionId={props.questionId}
        answerSelected={props.answerSelected}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }
  console.log(props);
  return (
    <div
      className="containerQuiz"
      component="div"
      transitionName="example"
    >
      <div key={props.questionId}>
        <Progress score={props.result} counter={props.counter} total={props.questionTotal} avatar={props.avatar} />
        <QuestionCount
          counter={props.counter}
          total={props.questionTotal}
          result={props.result}
          timer={props.timer}
        />
        <Question content={props.question} image={props.image} />
        <Grid>
          <Row className="show-grid">
            {props.answerOptions.map(renderAnswerOptions)}
          </Row>
        </Grid>
        <br />
        <br />
        <br />
      </div>
      {props.extraMessage != null ? <span className="extraMessage">{props.extraMessage}</span> : ""}
    </div>
  );
}

// Quiz.propTypes = {
//   answer: React.PropTypes.string.isRequired,
//   answerOptions: React.PropTypes.array.isRequired,
//   question: React.PropTypes.string.isRequired,
//   questionId: React.PropTypes.number.isRequired,
//   questionTotal: React.PropTypes.number.isRequired,
//   onAnswerSelected: React.PropTypes.func.isRequired
// };

export default Quiz;
