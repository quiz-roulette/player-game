import React, { Component } from 'react';
import './DashboardComponent.css'
import { Grid, Row, Col } from 'react-bootstrap'
import socketIOClient from 'socket.io-client'
import Server from '../API/server'
import ProgressBarComponent from '../ProgressBarComponent/ProgressBarComponent'

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        const { match: { params } } = props;

        this.state = {
            Results: [],
            QuizId: params.quizid,
            QuestionCount: 5,
            endpoint: "https://axperience.herokuapp.com/",
        }

        Server.getQuizLog(params.quizid).then((res) => {
            if (res.data) {
                Server.getQuestionCountForQuiz(params.quizid).then((res1) => {
                    console.log(res.data);
                    res.data.sort(function (a, b) { return a.TimeTaken - b.TimeTaken && b.Score - a.Score });
                    console.log(res1.data);
                    this.setState((prevState, props) => ({
                        Results: res.data,
                        QuestionCount: res1.data[0].Count
                    }));
                })
            }
        })
    }
    update() {
        var results = [];
        for (var i = 0; i < 5; i++) {
            results.push({ TimeTaken: this.getRandomInt(1, 1000), QuizUserId: "Name" + i, Score: this.getRandomInt(1, 5) * 250 });
        }
        results.sort(function (a, b) { return a.TimeTaken - b.TimeTaken && b.Score - a.Score });
        this.setState((prevState, props) => ({
            Results: results
        }));
    }
    render() {
        const rows = [];
        for (var i = 0; i < this.state.Results.length; i++) {
            var winningScore = Number.parseInt(((250 * this.state.QuestionCount) * 66.67) / 100);
            var percentage = ((this.state.Results[i].Score * 100) / (250 * this.state.QuestionCount));
            console.log(percentage);
            rows.push(
                <Row className="show-grid">
                    <Col xs={6} md={1} className="username">
                        <span >{this.state.Results[i].QuizUserId}</span>
                    </Col>
                    <Col xs={6} md={10}>
                        <ProgressBarComponent percentage={percentage} avatar={this.state.Results[i].Avatar} key={i} />
                    </Col>
                    <Col xsHidden md={1}>
                        <img className="status" src={
                            this.state.Results[i].Score >= winningScore ?
                                "https://axperienceapp.azurewebsites.net/avatar/firework" :
                                "https://axperienceapp.azurewebsites.net/avatar/finisher"}
                        />
                    </Col>
                </Row>)
        }
        return (
            <div>
                <h4 className="title">{this.state.QuizId}</h4>
                <Grid>{rows}</Grid>
                <br />
                <p className="footernote">The winner is based on the algorithm to choose the best time and score.</p>
            </div>)
    }

    componentDidMount() {
        const socket = socketIOClient(this.state.endpoint)

        // socket.on is another method that checks for incoming events from the server
        // This method is looking for the event 'change color'
        // socket.on takes a callback function for the first argument
        if (!socket.disconnected) {
            socket.on('update quiz user result', (obj) => {
                // setting the color of our button
                obj.isSocket = true;
                if (obj.QuizId === this.state.QuizId) {
                    var results = [];
                    var found = false;
                    this.state.Results.forEach((element) => {
                        if (element.QuizUserId === obj.QuizUserId) {
                            element.Score = obj.Score;
                            found = true;
                        }
                        results.push(element);
                    });
                    if (found === false) {
                        results.push(obj);
                    }
                    this.setState((prevState, props) => ({
                        Results: results
                    }));
                }
            })
        }
    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default DashboardComponent;