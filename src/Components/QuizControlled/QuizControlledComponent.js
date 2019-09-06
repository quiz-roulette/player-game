import React, { Component } from 'react';
import update from 'react-addons-update';
import { Quiz, Result } from './Sub-Controlled-Components'
import socketIOClient from 'socket.io-client'
import Server from '../API/server'
import './QuizControlledComponent.css';
import { Link } from 'react-router-dom'
import Alert from 'react-s-alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loadinggif from '../../assest/searching.gif';

const WAITING_TO_START = 'waiting_to_start';
const QUESTION_RECEIVED = 'question_received';
const ANSWERED_AND_WAITING = 'answered_and_waiting';
const In_BETWEEN_SCORE = 'in_between_score';
const FINAL_SCORE = 'final_score';

const SOCKET_STOP_QUIZ = "stop quiz"
const SOCKET_UPDATE_QUIZ_USER_RESULT = "update quiz user result"
const SOCKET_QUIZ_USER_RANK = "quiz user rank"
const SOCKET_NEW_QUESTION = "new question"

class QuizControlledComponent extends Component {

  constructor(props) {
    super(props);
    const { match: { params } } = props;
    console.log(params);
    this.state = {
      QuizId: params.id,
      CategoryName: params.categoryname,
      QuizUserId: localStorage.getItem('u'),
      counter: 0,
      questionCounter: 0,
      questionId: 0,
      question: '',
      choice: [],
      answer: -1,
      answerSelected: -1,
      result: 0,
      score: 0,
      timer: 0,
      questionTotal: 0,
      endpoint: "https://axperience.herokuapp.com/",
      avatar: "https://axperienceapp.azurewebsites.net/avatar/bee",
      fact: null,
      streak: 0,
      status: WAITING_TO_START
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);

    if (!localStorage.getItem('u')) {
      this.props.history.push("/account");
    }

    setInterval(
      this.getRandomFact()
      , 50000)
  }

  componentWillMount() {

    //Added - Controlled
    Server.getQuizUserAvatar(localStorage.getItem('u')).then((res) => {
      console.log('avatar found', res);
      this.setState({
        avatar: res.data
      })
    })
    //Added - End

    const socket = socketIOClient(this.state.endpoint)
    //Expecting {QuizId: quizid}
    socket.on('stop quiz', (obj) => {

      var isEnded = this.state.QuizId === obj.QuizId ? true : false;
      this.setState((prevState, props) => {
        return { QuizEnded: isEnded, status: FINAL_SCORE};
      });
      if (isEnded) {
        //alert?
      }
    });

    socket.on('update quiz user result', (obj) => {
      if (obj.QuizId == this.state.QuizId) {
        Server.getQuizUserRank(this.state.QuizId, this.state.QuizUserId).then((res) => {
          console.log("Rank", res);
          this.setState({
            rank: res.data.Rank
          })
        })
      }
    })

    socket.on('quiz user rank', (obj) => {
      console.log(obj);
      if (obj.QuizId == this.state.QuizId && obj.QuizUserId == this.state.QuizUserId) {
        this.setState({
          rank: obj.Rank
        })
      }
    })

    socket.on('new question', (result) => {
      if (result.QuizId === this.state.QuizId) {
        this.setNextQuestionControlled(result)
      }
    })

  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
  }

  setUserAnswer(answer) {
    const socket = socketIOClient(this.state.endpoint)
    var updatedAnswersCount = this.state.score;
    var newScore = 0;
    if (answer !== -1 && Number.parseInt(answer) === this.state.CorrectChoiceId) {
      newScore = 250;
      // this.setState((state, props) => {
      //   return {
      //     streak: state.streak + 1
      //   };
      // });
    }
    else {
      // this.setState({
      //   streak: 0
      // })
    }

    // if (this.state.streak >= 5) {
    //   toast.info("Answering Streak +50 points", {
    //     position: toast.POSITION.BOTTOM_CENTER
    //   });
    //   this.setState({
    //     streak: 0
    //   })
    // }

    var obj = {
      QuizId: this.state.QuizId,
      QuizUserId: localStorage.getItem('u'),
      QuestionId: this.state.questionId,
      ChoiceId: answer,
      Score: newScore,
      TimeTaken: this.state.timer
    };

    updatedAnswersCount += newScore;
    Server.addQuizLog(obj).then((res) => { console.log("added") });
    socket.emit('update quiz user result', obj)
    this.setState({
      questionId: 0,
      status: ANSWERED_AND_WAITING
    })
    clearInterval(this.interval);
    // this.setState({
    //   score: updatedAnswersCount,
    //   answer: this.state.CorrectChoice.find(x => x.QuestionId === this.state.questionId).ChoiceId,
    //   answerSelected: Number.parseInt(answer)
    // }, () => {
    //   if (this.state.counter + 1 < this.state.questionTotal) {
    //     setTimeout(() => {
    //       this.setNextQuestion();
    //     }, 500);
    //   } else {
    //     setTimeout(() => {
    //       this.setResults(this.getResults());
    //     }, 500);
    //   }
    // });
  }

  setNextQuestionControlled(question) {
    const counter = this.state.counter + 1;
    const questionCounter = this.state.questionCounter + 1;
    this.setState({
      counter: counter,
      questionCounter: questionCounter,
      questionId: question.QuestionId,
      question: question.Text,
      image: question.ImageUrl,
      answerOptions: question.Choices,
      answer: -1,
      answerSelected: -1,
      correctAnswer: question.CorrectChoiceId,
      timer: question.CountDownTimer,
      status: QUESTION_RECEIVED
    });

    this.interval = setInterval(() => {
      if (this.state.timer == 0) {
        this.setState({
          questionId: 0,
          status: In_BETWEEN_SCORE
        })
        clearInterval(this.interval);
      }
      else {
        this.setState((prevState, props) => {
          return { timer: prevState.timer - 1 };
        });
      }
    }, 1000);
  }

  random(min, max) {
    return Math.floor(Math.random() * (+max - +min)) + +min;
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
    const rank = this.state.rank ? 'Your Current Rank: ' + this.state.rank : null
    return (
      <div className="innerContainer">
        <Quiz
          answer={this.state.answer}
          answerOptions={this.state.answerOptions}
          questionId={this.state.questionId}
          question={this.state.question}
          questionTotal={this.state.questionTotal}
          result={this.state.score}
          image={this.state.image}
          onAnswerSelected={this.handleAnswerSelected}
          counter={this.state.counter}
          timer={this.state.timer}
          avatar={this.state.avatar}
          answerSelected={this.state.answerSelected}
          extraMessage={rank}
        />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }

  getRandomFact() {
    Server.getRandomFact().then((res) => {
      console.log(res);
      this.setState({
        fact: res.data.Text
      })
    })
  }

  renderResult() {
    return (
      <div>
        <Result quizResult={this.state.result} fact={this.state.fact} rank={this.state.rank} />
      </div>
    );
  }

  renderLoading() {
    return (
      <div className="loading-center">
        {/* <img src={loadinggif} height="300px" width="700px"/>  */}
      </div>
      //   <div class="centered-loading">
      //     <div class="blob-1"></div>
      //     <div class="blob-2"></div>
      //   </div>
      //   <span class="centered-loading-text">loading...</span>
      // </div>
      // </div>
    );
  }

  renderWaitingPage(){
    return (<div>
      It is a waiting page, probably other users have yet to answer the question!
    </div>);
  }

  renderInterimScore(){
    return (<div>In between score</div>);
  }

  render() {
    if(this.state.status == WAITING_TO_START) return this.renderLoading();
    else if(this.state.status == QUESTION_RECEIVED) return this.renderQuiz(); 
    else if(this.state.status == ANSWERED_AND_WAITING) return this.renderWaitingPage();    
    else if(this.state.status == In_BETWEEN_SCORE) return this.renderInterimScore();
    else if(this.state.status == FINAL_SCORE) return this.renderResult();
    else return (<div>Invalid Status Found</div>);                                                    
  }

}

export default QuizControlledComponent;
