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
import inbetweenloading2 from '../../assest/inbetweenloading2.svg'

const WAITING_TO_START = 'waiting_to_start';
const QUESTION_RECEIVED = 'question_received';
const ANSWERED_AND_WAITING = 'answered_and_waiting';
const In_BETWEEN_SCORE = 'in_between_score';
const FINAL_SCORE = 'final_score';

const SOCKET_STOP_QUIZ = "stop quiz"
const SOCKET_UPDATE_QUIZ_USER_RESULT = "update quiz user result"
const SOCKET_QUIZ_USER_RANK = "quiz user rank"
const SOCKET_NEW_QUESTION = "new question"
const SOCKET_STOP_QUESTION = "stop question"

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
        return { QuizEnded: isEnded, status: FINAL_SCORE };
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
        console.log("RESULT")
        console.log(result);
        this.setNextQuestionControlled(result.Question)
      }
    })

    socket.on('stop question', (result) => {
      if (result.QuizId === this.state.QuizId) {
        this.setState({
          questionId: 0,
          status: In_BETWEEN_SCORE
        })
        clearInterval(this.interval);
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
    socket.emit("question answered", obj);
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
      question: question.QuestionText,
      image: question.QuestionImageURL,
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
        <span className="titlequiz">Quiz: {this.state.QuizId}</span>
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

  renderWaitingPage() {
    return (
      <div className="center-loading">
        {/* <img className="center-loading" src={inbetweenloading2}/> */}
      </div>);
  }

  renderInterimScore() {
    return (<div >
      <div className="svgform">
        <svg height="40pt" viewBox="0 0 496 496" width="40pt" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
          <linearGradient id="a" gradientTransform="matrix(8 0 0 -8 -8 504)" gradientUnits="userSpaceOnUse" x1="32" x2="32" y1="1" y2="63">
            <stop offset="0" stop-color="#9f2fff" ></stop>
            <stop offset="1" stop-color="#0bb1d3" ></stop>
          </linearGradient>
          <path d="m216 280h16c0 8.824219 7.175781 16 16 16s16-7.175781 16-16h16c0 17.648438-14.351562 32-32 32s-32-14.351562-32-32zm-144 154.59375c0-24.144531 15.382812-45.496094 38.296875-53.121094l81.703125-27.242187v-22.40625c-13.6875-11.320313-23.824219-26.726563-28.710938-44.304688-19.816406-2.367187-35.289062-19.078125-35.289062-39.519531v-64c0-46.089844 26.910156-88.65625 68.566406-108.449219l6.867188 14.457031c-36.105469 17.152344-59.433594 54.046876-59.433594 93.992188v32.207031c4.671875-3.535156 10.054688-6.183593 16-7.390625v-40.816406h16v19.847656c19.175781 13.601563 41.449219 22.566406 64.726562 25.886719l3.96875.570313c-1.261718-8.761719.121094-17.832032 4.144532-25.878907l4.289062-8.570312 7.664063 5.753906c17.582031 13.183594 37.894531 22.894531 59.199219 28.375v-21.984375h16v16.808594c5.945312 1.214844 11.328124 3.855468 16 7.390625v-32.199219c0-39.945312-23.328126-76.839844-59.433594-93.992188l6.867187-14.457031c41.652344 19.792969 68.566407 62.359375 68.566407 108.449219v64c0 20.441406-15.472657 37.160156-35.289063 39.519531-4.886719 17.578125-15.023437 32.984375-28.710937 44.304688v22.40625l81.710937 27.242187c22.90625 7.625 38.289063 28.976563 38.289063 53.121094v61.40625h-352v-61.40625zm226.160156-65.441406-37.824218 37.824218 38.25 27.320313 12.191406-60.945313zm37.839844-143.679688v38.527344c0 2.238281-.167969 4.433594-.335938 6.632812 9.464844-3.21875 16.335938-12.089843 16.335938-22.632812 0-10.414062-6.710938-19.214844-16-22.527344zm-175.664062 45.160156c-.167969-2.199218-.335938-4.394531-.335938-6.632812v-38.527344c-9.289062 3.3125-16 12.113282-16 22.527344 0 10.535156 6.871094 19.414062 16.335938 22.632812zm87.664062 65.367188c39.695312 0 72-32.296875 72-72v-33.734375c-21.105469-4.9375-41.457031-13.480469-59.585938-25.394531-.589843 5.28125.320313 10.703125 2.746094 15.542968l6.832032 13.65625-31.519532-4.496093c-22.128906-3.160157-43.425781-10.949219-62.464844-22.589844v57.015625c-.007812 39.703125 32.296876 72 71.992188 72zm-40 6.289062v14.398438l40 40 40-40v-14.398438c-12.015625 6.167969-25.59375 9.710938-40 9.710938s-27.984375-3.550781-40-9.710938zm-22.769531 31.0625 12.195312 60.945313 38.246094-27.320313-37.824219-37.824218zm-97.230469 106.648438h48v-32h16v32h192v-32h16v32h48v-45.40625c0-17.242188-10.992188-32.496094-27.34375-37.945312l-54.585938-18.191407-16.644531 83.246094-61.417969-43.871094-61.414062 43.871094-16.648438-83.246094-54.585937 18.191407c-16.359375 5.457031-27.351563 20.703124-27.351563 37.945312v45.40625zm120-232c4.414062 0 8-3.585938 8-8s-3.585938-8-8-8-8 3.585938-8 8 3.585938 8 8 8zm80 0c4.414062 0 8-3.585938 8-8s-3.585938-8-8-8-8 3.585938-8 8 3.585938 8 8 8zm168-248c-22.054688 0-40 17.945312-40 40v16h16v-16c0-13.230469 10.769531-24 24-24s24 10.769531 24 24v4.777344c0 5.429687-1.863281 10.757812-5.257812 14.992187l-26.742188 33.429688v26.800781h16v-21.191406l23.230469-29.039063c5.65625-7.066406 8.769531-15.9375 8.769531-24.992187v-4.777344c0-22.054688-17.945312-40-40-40zm8 136h-16v16h16zm-80 64v16h16v-16c0-13.230469 10.769531-24 24-24s24 10.769531 24 24v4.777344c0 5.429687-1.863281 10.757812-5.257812 14.992187l-26.742188 33.429688v26.800781h16v-21.191406l23.230469-29.039063c5.65625-7.066406 8.769531-15.9375 8.769531-24.992187v-4.777344c0-22.054688-17.945312-40-40-40s-40 17.945312-40 40zm48 96h-16v16h16zm-176-197.191406 23.230469-29.039063c5.65625-7.066406 8.769531-15.9375 8.769531-24.992187v-4.777344c0-22.054688-17.945312-40-40-40s-40 17.945312-40 40v16h16v-16c0-13.230469 10.769531-24 24-24s24 10.769531 24 24v4.777344c0 5.429687-1.863281 10.757812-5.257812 14.992187l-26.742188 33.429688v26.800781h16zm-16 53.191406h16v-16h-16zm-149.257812-92.230469-26.742188 33.429688v26.800781h16v-21.191406l23.230469-29.039063c5.65625-7.066406 8.769531-15.9375 8.769531-24.992187v-4.777344c0-22.054688-17.945312-40-40-40s-40 17.945312-40 40v16h16v-16c0-13.230469 10.769531-24 24-24s24 10.769531 24 24v4.777344c0 5.421875-1.863281 10.75-5.257812 14.992187zm-10.742188 76.230469h-16v16h16zm-64 64c0-13.230469 10.769531-24 24-24s24 10.769531 24 24v4.777344c0 5.429687-1.863281 10.757812-5.257812 14.992187l-26.742188 33.429688v26.800781h16v-21.191406l23.230469-29.039063c5.65625-7.066406 8.769531-15.9375 8.769531-24.992187v-4.777344c0-22.054688-17.945312-40-40-40s-40 17.945312-40 40v16h16zm16 112h16v-16h-16zm0 0" fill="url(#a)" >
          </path>
        </svg>
        <h4 style={{ fontStyle: "oblique" }}>Quiz Roulette</h4>
      </div>
      <br/>
      <br/>
      
      Your current score: {this.state.score}
    </div>);
  }

  render() {
    if (this.state.status == WAITING_TO_START) return this.renderLoading();
    else if (this.state.status == QUESTION_RECEIVED) return this.renderQuiz();
    else if (this.state.status == ANSWERED_AND_WAITING) return this.renderWaitingPage();
    else if (this.state.status == In_BETWEEN_SCORE) return this.renderInterimScore();
    else if (this.state.status == FINAL_SCORE) return this.renderResult();
    else return (<div>Invalid Status Found</div>);
  }

}

export default QuizControlledComponent;
