import React, { Component } from 'react';
import update from 'react-addons-update';
import { Quiz, Result } from './Sub-Components'
import socketIOClient from 'socket.io-client'
import Server from '../API/server'
import './QuizComponent.css';
import { Link } from 'react-router-dom'
import Alert from 'react-s-alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loadinggif from '../../assest/searching.gif';
class QuizComponent extends Component {

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
      Questions: [],
      Choices: [],
      CorrectChoice: [],
      timer: 0,
      questionTotal: 0,
      endpoint: "https://axperience.herokuapp.com/",
      avatar: "https://axperienceapp.azurewebsites.net/avatar/bee",
      fact: null,
      streak: 0
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
    // const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));
    console.log("counter", this.state.Questions.length);

    Server.getQuizByUserIdAndQuizId(localStorage.getItem('u'), this.state.QuizId).then((res) => {
      res[0].data = this.shuffleArray(res[0].data);
      console.log(res);
      console.log(this.state.QuizId);
      Server.getQuizLogSummationForUserByQuiz(localStorage.getItem('u'), this.state.QuizId).then((res1) => {
        console.log(res1);
        if (res[0].data.length === 0) {
          /**
           * setting Questionid to -1 due to the render function checks for non zero question id
           */
          Server.getQuizUserRank(this.state.QuizId, localStorage.getItem('u')).then((res_rank) => {
            this.setState({
              questionId: -1,
              result: res1.data[0].Score,
              rank: res_rank.data.Rank
            });
          })
          return;
        }
        else if (res1.data.length > 0) {
          var quizlog = res1.data[0];
          this.setState({
            counter: quizlog.QuestionCount,
            avatar: quizlog.Avatar,
            timer: quizlog.TimeTaken,
            score: quizlog.Score,
            questionTotal: quizlog.QuestionCount
          })
        }
        this.setState((prevState, props) => ({
          Questions: res[0].data,
          Choices: res[1].data,
          CorrectChoice: res[2].data,
          questionTotal: res[0].data.length + prevState.questionTotal
        }));

        this.setState({
          question: this.state.Questions[0].Text,
          questionId: this.state.Questions[0].QuestionId,
          answerOptions: this.state.Choices.filter(x => x.QuestionId === this.state.Questions[0].QuestionId),
          image: this.state.Questions[0].ImageUrl,
        });

        Server.getQuizUserAvatar(localStorage.getItem('u')).then((res) => {
          console.log('avatar found', res);
          this.setState({
            avatar: res.data
          })
        })
        setInterval(() => {
          this.setState((prevState, props) => {
            return { timer: prevState.timer + 1 };
          });
        }, 1000);
      })
    }).catch((err) => {
      Alert.error('Unable to set up quiz', {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      });
    })

    const socket = socketIOClient(this.state.endpoint)
    //Expecting {QuizId: quizid}
    socket.on('stop quiz', (obj) => {

      var isEnded = this.state.QuizId === obj.QuizId ? true : false;
      this.setState((prevState, props) => {
        return { QuizEnded: isEnded };
      });
      if (isEnded) {
        Alert.info('Quiz has been ended by Admin', {
          position: 'top-right',
          effect: 'slide',
          timeout: 'none'
        });
        this.props.history.push("/account/");
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
  }

  setUserAnswer(answer) {
    const socket = socketIOClient(this.state.endpoint)
    var updatedAnswersCount = this.state.score;
    var newScore = 0;
    if (answer !== -1 && Number.parseInt(answer) === this.state.CorrectChoice.find(x => x.QuestionId === this.state.questionId).ChoiceId) {
      newScore = 250;
      this.setState((state, props) => {
        return {
          streak: state.streak + 1
        };
      });
    }
    else {
      this.setState({
        streak: 0
      })
    }

    if (this.state.streak >= 5) {
      toast.info("Answering Streak +50 points", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      this.setState({
        streak: 0
      })
    }
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
      score: updatedAnswersCount,
      answer: this.state.CorrectChoice.find(x => x.QuestionId === this.state.questionId).ChoiceId,
      answerSelected: Number.parseInt(answer)
    }, () => {
      if (this.state.counter + 1 < this.state.questionTotal) {
        setTimeout(() => {
          this.setNextQuestion();
        }, 500);
      } else {
        setTimeout(() => {
          this.setResults(this.getResults());
        }, 500);
      }
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionCounter = this.state.questionCounter + 1;

    this.setState({
      counter: counter,
      questionCounter: questionCounter,
      questionId: this.state.Questions[questionCounter].QuestionId,
      question: this.state.Questions[questionCounter].Text,
      image: this.state.Questions[questionCounter].ImageUrl,
      answerOptions: this.state.Choices.filter(x => x.QuestionId === this.state.Questions[questionCounter].QuestionId),
      answer: -1,
      answerSelected: -1
    });
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

  render() {
    if (this.state.questionId != 0) {
      if (this.state.result) {
        return this.renderResult();
      }
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
