import React, { Component } from 'react';
import update from 'react-addons-update';
import { Quiz, Result } from './Sub-Components'
import Server from '../API/server'
import './QuizComponent.css';

class QuizComponent extends Component {

  constructor(props) {
    super(props);
    const { match: { params } } = props;
    console.log(params);
    this.state = {
      QuizId: params.id,
      CategoryName: params.categoryname,
      counter: 0,
      questionId: 0,
      question: '',
      choice: [],
      answer: -1,
      answerSelected: -1,
      result: 0,
      score: 0,
      Questions: [],
      Choices: [],
      CorrectChoice: [],
      timer: 0,
      avatar: "https://axperienceapp.azurewebsites.net/avatar/bee"
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);

    if(!localStorage.getItem('u')){
      this.props.history.push("/account");
    }
  }

  componentWillMount() {
    // const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));
    console.log("counter", this.state.Questions.length);

    Server.getQuizById("").then((res) => {
      console.log(res[0].data)
      console.log(this.state.QuizId);
      var questions = res[0].data.filter((el) => el.CategoryName === this.state.CategoryName);

      this.setState({
        Questions: questions,
        Choices: res[1].data,
        CorrectChoice: res[2].data
      });

      this.setState({
        question: this.state.Questions[0].Text,
        questionId: this.state.Questions[0].QuestionId,
        answerOptions: this.state.Choices.filter(x => x.QuestionId === this.state.Questions[0].QuestionId)
      });

      setInterval(() => {
        this.setState((prevState, props) => {
          return { timer: prevState.timer + 1 };
        });
      }, 1000);
    })

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

    if (this.state.counter + 1 < this.state.Questions.length) {
      setTimeout(() => this.setNextQuestion(), 3000);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 600);
    }
  }

  setUserAnswer(answer) {
    var updatedAnswersCount = this.state.score;
    var newScore = 0;
    if (answer !== -1 && Number.parseInt(answer) === this.state.CorrectChoice.find(x => x.QuestionId === this.state.questionId).ChoiceId)
      newScore = 50;

    var obj = {
      QuizId: this.state.QuizId,
      QuizUserId: 'Up and On 4',
      QuestionId : this.state.questionId,
      ChoiceId : answer,
      Score : newScore,
      TimeTaken : this.state.timer 
    }
    updatedAnswersCount += newScore;
    Server.addQuizLog(obj).then((res) => { console.log("added")});

    this.setState({
      score: updatedAnswersCount,
      answer: this.state.CorrectChoice.find(x => x.QuestionId === this.state.questionId).ChoiceId,
      answerSelected: Number.parseInt(answer)
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;

    this.setState({
      counter: counter,
      questionId: this.state.Questions[counter].QuestionId,
      question: this.state.Questions[counter].Text,
      answerOptions: this.state.Choices.filter(x => x.QuestionId === this.state.Questions[counter].QuestionId),
      answer: -1,
      answerSelected: -1
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
        questionTotal={this.state.Questions.length}
        result={this.state.score}
        onAnswerSelected={this.handleAnswerSelected}
        counter={this.state.counter}
        timer={this.state.timer}
        avatar={this.state.avatar}
        answerSelected={this.state.answerSelected}
      />
    );
  }

  renderResult() {
    return (
      <Result quizResult={this.state.result} />
    );
  }

  renderLoading() {
    return (<h1>Loading...</h1>);
  }

  render() {
    if (this.state.questionId != 0) {
      if (this.state.result) return this.renderResult();
      else return this.renderQuiz();
    }
    else return this.renderLoading();
    // return (
    //   <div className="Quiz">
    //     {this.state.result ? this.renderResult() : this.renderQuiz()}
    //   </div>
    // );
  }

}

export default QuizComponent;
