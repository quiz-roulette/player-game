import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Question,AnswerOption,QuestionCount} from './index'

function Quiz(props) {

  function renderAnswerOptions(key) {
    console.log(key);
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        answerType={key.type}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

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
        <QuestionCount
          counter={props.questionId}
          total={props.questionTotal}
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
