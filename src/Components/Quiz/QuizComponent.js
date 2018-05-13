import React, { Component } from 'react';
import update from 'react-addons-update';
import { Quiz, Result } from './Sub-Components'
import quizQuestions from '../API/quizQuestion'
import quizChoice from '../API/quizChoice'
import quizCorrectChoice from '../API/quizCorrectChoice'
import './QuizComponent.css';

class QuizComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 0,
      question: '',
      choice: [],
      answer: -1,
      result: 0,
      score: 0
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount() {
    // const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));
    console.log("counter",quizQuestions.length);
    this.setState({
      question: quizQuestions[0].Text,
      questionId: quizQuestions[0].QuestionId,
      answerOptions: quizChoice.filter(x => x.QuestionId === quizQuestions[0].QuestionId)
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.counter+1 < quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 600);
    } else {
        setTimeout(() => this.setResults(this.getResults()), 600);
    }
  }

  setUserAnswer(answer) {
    var updatedAnswersCount = this.state.score;
    if(answer !== -1 && Number.parseInt(answer) === quizCorrectChoice.find(x => x.QuestionId === this.state.questionId).ChoiceId)
      updatedAnswersCount = updatedAnswersCount + 50;

    this.setState({
        score: updatedAnswersCount,
        answer: quizCorrectChoice.find(x => x.QuestionId === this.state.questionId).ChoiceId
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;

    this.setState({
        counter: counter,
        questionId: quizQuestions[counter].QuestionId,
        question: quizQuestions[counter].Text,
        answerOptions: quizChoice.filter(x => x.QuestionId === quizQuestions[counter].QuestionId),
        answer: -1
    });
  }

  getResults() {
    // const answersCount = this.state.answersCount;
    // const answersCountKeys = Object.keys(answersCount);
    // const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    // const maxAnswerCount = Math.max.apply(null, answersCountValues);
    
    return this.state.score;//answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    this.setState({ result: this.state.score });
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        result={this.state.score}
        onAnswerSelected={this.handleAnswerSelected}
        counter = {this.state.counter}
      />
    );
  }

  renderResult() {
    return (
      <Result quizResult={this.state.result} />
    );
  }

  render() {
    return (
      <div className="Quiz">
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }

}

export default QuizComponent;
