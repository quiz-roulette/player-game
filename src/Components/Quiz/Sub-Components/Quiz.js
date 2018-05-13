import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Question,AnswerOption,QuestionCount,Progress} from './index'

function Quiz(props) {

  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key.ChoiceId}
        answerContent={key.Text}
        answerId = {key.ChoiceId}
        // answerType={key.type}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }
  console.log(props);
  return (
    <ReactCSSTransitionGroup
      className="containerQuiz"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div key={props.questionId}>
      <Progress score={props.result} counter={props.counter} total={props.questionTotal} />
        <QuestionCount
          counter={props.counter}
          total={props.questionTotal}
          result = {props.result}
        />
        <Question content={props.question} />
        <ul className="answerOptions">
          {props.answerOptions.map(renderAnswerOptions)}
        </ul>
      </div>
    </ReactCSSTransitionGroup>
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
