import React, { Component } from 'react';
import './DashboardComponent.css'
import './firework.css'
import { Grid, Row, Col, Button, Table } from 'react-bootstrap'
import socketIOClient from 'socket.io-client'
import Server from '../API/server'
import ProgressBarComponent from '../ProgressBarComponent/ProgressBarComponent'
import { subscribeToResult, subscribeToOnlineUser } from '../API/socket';
const users = [];

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        const { match: { params } } = props;

        this.state = {
            Results: [],
            QuizId: params.quizid,
            QuestionCount: 5,
            endpoint: "https://axperience.herokuapp.com/",
            UserCount: 0,
            View: 'LIST'
        }
        this.update();

        subscribeToResult((err, result) => {
            this.update();
        });

        subscribeToOnlineUser((err, result) => {
            var found = false;
            for (var i = 0; i < users.length; i++) {
                if (users[i] === result.QuizUserId) {
                    found = true;
                }
            }
            if (!found) {
                users.push(result.QuizUserId);
                this.setState({
                    UserCount: users.length
                })
            }
        })

        this.handleViewClick = this.handleViewClick.bind(this);
    }
    update() {
        Server.getQuizLog(this.state.QuizId).then((res) => {
            if (res.data) {
                Server.getQuestionCountForQuiz(this.state.QuizId).then((res1) => {
                    console.log(res.data);
                    // res.data.sort(function (a, b) { return b.Score - a.Score });
                    // res.data.sort(function(a,b){ return a.TimeTaken - b.TimeTaken});
                    console.log(res1.data);
                    this.setState((prevState, props) => ({
                        Results: res.data,
                        QuestionCount: res1.data[0].Count
                    }));
                })
            }
        });
    }

    handleViewClick() {
        var currentState = this.state.View;
        this.setState({
            View: currentState === 'LIST' ? 'GRID' : 'LIST'
        })
    }

    render() {

        return (
            <div>
                <h3 className="title">{this.state.QuizId}</h3>
                <h6 className="title">Online Users: {this.state.UserCount}</h6>
                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        
                    </Col>
                    <Col xsHidden  md={4}>
                        
                    </Col>
                    <Col xs={6} md={4} >
                        <Button className="togglebutton" bsStyle="link" onClick={this.handleViewClick} >{this.state.View === 'LIST' ? 'GRID' : 'LIST'}</Button>
                    </Col>
                </Row>
                {this.state.View === 'LIST' ? this.renderList() : this.renderTable()}
                <br />
                <p className="footernote">The winner is based on the algorithm to choose the best time and score.</p>
            </div>)
    }

    renderList() {
        const rows = [];
        for (var i = 0; i < this.state.Results.length; i++) {
            var winningScore = Number.parseInt(((250 * this.state.QuestionCount) * 66.67) / 100);
            var percentage = ((this.state.Results[i].Score * 100) / (250 * this.state.QuestionCount));
            console.log(percentage);
            rows.push(
                <Row className="show-grid">
                    <Col xs={3} md={1} className="username">
                        <span >{this.state.Results[i].QuizUserId}</span>
                    </Col>
                    <Col xs={6} md={10}>
                        <ProgressBarComponent percentage={percentage} avatar={this.state.Results[i].Avatar} key={i} />
                    </Col>
                    <Col xs={3} md={1}>
                        {
                            this.state.Results[i].Score >= winningScore ?
                                <img className="status" src="https://axperienceapp.azurewebsites.net/avatar/firework" /> :
                                <img className="status" src="https://axperienceapp.azurewebsites.net/avatar/finisher" />
                        }


                    </Col>
                </Row>)
        }
        return (<Grid>{rows}</Grid>);
    }

    renderTable() {
        const rows = [];
        for (var i = 0; i < this.state.Results.length; i++) {
            rows.push(
                <tr>
                    <td>{i + 1}</td>
                    <td>{this.state.Results[i].QuizUserId}</td>
                    <td>{this.state.Results[i].Score}</td>
                    <td>{this.state.Results[i].TimeTaken}</td>
                </tr>
            );
        }
        return (<Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Total Score</th>
                    <th>Time Taken</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>)
    }

    renderFirework() {
        return (<span class="svg"><svg xmlns="http://www.w3.org/2000/svg" id="firework-slide2" class="firework-icon injected-svg img-firework inject-svg" data-name="Calque 1" viewBox="0 0 157 156">
            <title>icon_firework_1</title>
            <path class="cls-3" d="M80.52,106.92a0.65,0.65,0,0,1-.65-0.65v-10a0.65,0.65,0,0,1,1.3,0v10A0.65,0.65,0,0,1,80.52,106.92Z"></path>
            <path class="cls-3" d="M97.72,100.91a0.65,0.65,0,0,1-.52-0.26l-6-8a0.65,0.65,0,0,1,1-.78l6,8A0.65,0.65,0,0,1,97.72,100.91Z"></path>
            <path class="cls-3" d="M108.32,85.95a0.61,0.61,0,0,1-.19,0l-9.55-3A0.65,0.65,0,1,1,99,81.69l9.55,3A0.65,0.65,0,0,1,108.32,85.95Z"></path>
            <path class="cls-3" d="M98.77,71a0.65,0.65,0,0,1-.2-1.27l9.55-3a0.65,0.65,0,1,1,.39,1.24L99,71A0.66,0.66,0,0,1,98.77,71Z"></path>
            <path class="cls-3" d="M91.7,61a0.65,0.65,0,0,1-.52-1l6-8a0.65,0.65,0,0,1,1,.78l-6,8A0.65,0.65,0,0,1,91.7,61Z"></path>
            <path class="cls-3" d="M80.52,57a0.65,0.65,0,0,1-.65-0.65v-10a0.65,0.65,0,0,1,1.3,0v10A0.65,0.65,0,0,1,80.52,57Z"></path>
            <path class="cls-3" d="M67.64,61a0.65,0.65,0,0,1-.52-0.26l-6-8a0.65,0.65,0,0,1,1-.78l6,8A0.65,0.65,0,0,1,67.64,61Z"></path>
            <path class="cls-3" d="M60.57,71a0.66,0.66,0,0,1-.2,0l-9.55-3a0.65,0.65,0,1,1,.39-1.24l9.55,3A0.65,0.65,0,0,1,60.57,71Z"></path>
            <path class="cls-3" d="M51,85.95a0.65,0.65,0,0,1-.19-1.27l9.55-3a0.65,0.65,0,1,1,.39,1.24l-9.55,3A0.61,0.61,0,0,1,51,85.95Z"></path>
            <path class="cls-3" d="M61.62,100.91a0.65,0.65,0,0,1-.52-1l6-8a0.65,0.65,0,0,1,1,.78l-6,8A0.65,0.65,0,0,1,61.62,100.91Z"></path>

            <path class="cls-2" d="M80.52,126.88a0.65,0.65,0,0,1-.65-0.65v-10a0.65,0.65,0,0,1,1.3,0v10A0.65,0.65,0,0,1,80.52,126.88Z"></path>
            <path class="cls-2" d="M109.74,116.86a0.65,0.65,0,0,1-.52-0.26l-6-8a0.65,0.65,0,0,1,1-.78l6,8A0.65,0.65,0,0,1,109.74,116.86Z"></path>
            <path class="cls-2" d="M127.42,91.92a0.61,0.61,0,0,1-.19,0l-9.55-3a0.65,0.65,0,1,1,.39-1.24l9.55,3A0.65,0.65,0,0,1,127.42,91.92Z"></path>
            <path class="cls-2" d="M117.86,65a0.65,0.65,0,0,1-.2-1.27l9.55-3a0.65,0.65,0,1,1,.39,1.24l-9.55,3A0.66,0.66,0,0,1,117.86,65Z"></path>
            <path class="cls-2" d="M103.73,45.08a0.65,0.65,0,0,1-.52-1l6-8a0.65,0.65,0,0,1,1,.78l-6,8A0.65,0.65,0,0,1,103.73,45.08Z"></path>
            <path class="cls-2" d="M80.52,37.07a0.65,0.65,0,0,1-.65-0.65v-10a0.65,0.65,0,0,1,1.3,0v10A0.65,0.65,0,0,1,80.52,37.07Z"></path>
            <path class="cls-2" d="M55.61,45.08a0.65,0.65,0,0,1-.52-0.26l-6-8a0.65,0.65,0,0,1,1-.78l6,8A0.65,0.65,0,0,1,55.61,45.08Z"></path>
            <path class="cls-2" d="M41.47,65a0.62,0.62,0,0,1-.2,0l-9.55-3a0.65,0.65,0,1,1,.39-1.24l9.55,3A0.65,0.65,0,0,1,41.47,65Z"></path>
            <path class="cls-2" d="M31.92,91.93a0.65,0.65,0,0,1-.19-1.27l9.55-3a0.65,0.65,0,1,1,.39,1.24l-9.55,3A0.61,0.61,0,0,1,31.92,91.93Z"></path>
            <path class="cls-2" d="M49.59,116.86a0.65,0.65,0,0,1-.52-1l6-8a0.65,0.65,0,0,1,1,.78l-6,8A0.65,0.65,0,0,1,49.59,116.86Z"></path>

            <path class="cls-1" d="M80.52,146.83a0.65,0.65,0,0,1-.65-0.65v-10a0.65,0.65,0,0,1,1.3,0v10A0.65,0.65,0,0,1,80.52,146.83Z"></path>
            <path class="cls-1" d="M121.77,132.82a0.65,0.65,0,0,1-.52-0.26l-6-8a0.65,0.65,0,0,1,1-.78l6,8A0.65,0.65,0,0,1,121.77,132.82Z"></path>
            <path class="cls-1" d="M146.52,97.9a0.61,0.61,0,0,1-.19,0l-9.55-3a0.65,0.65,0,1,1,.39-1.24l9.55,3A0.65,0.65,0,0,1,146.52,97.9Z"></path>
            <path class="cls-1" d="M137,59a0.65,0.65,0,0,1-.2-1.27l9.55-3A0.65,0.65,0,1,1,146.7,56l-9.55,3A0.66,0.66,0,0,1,137,59Z"></path>
            <path class="cls-1" d="M115.76,29.12a0.65,0.65,0,0,1-.52-1l6-8a0.65,0.65,0,0,1,1,.78l-6,8A0.65,0.65,0,0,1,115.76,29.12Z"></path>
            <path class="cls-1" d="M80.52,17.11a0.65,0.65,0,0,1-.65-0.65v-10a0.65,0.65,0,0,1,1.3,0v10A0.65,0.65,0,0,1,80.52,17.11Z"></path>
            <path class="cls-1" d="M22.37,59a0.62,0.62,0,0,1-.2,0l-9.55-3A0.65,0.65,0,1,1,13,54.77l9.55,3A0.65,0.65,0,0,1,22.37,59Z"></path>
            <path class="cls-1" d="M12.82,97.9a0.65,0.65,0,0,1-.19-1.27l9.55-3a0.65,0.65,0,1,1,.39,1.24l-9.55,3A0.61,0.61,0,0,1,12.82,97.9Z"></path>
            <path class="cls-1" d="M43.58,29.12a0.65,0.65,0,0,1-.52-0.26l-6-8a0.65,0.65,0,0,1,1-.78l6,8A0.65,0.65,0,0,1,43.58,29.12Z"></path>
            <path class="cls-1" d="M37.56,132.82a0.65,0.65,0,0,1-.52-1l6-8a0.65,0.65,0,0,1,.91-0.13,0.65,0.65,0,0,1,.13.91l-6,8A0.65,0.65,0,0,1,37.56,132.82Z"></path>
        </svg></span>);
    }

    /* componentDidMount() {
        const socket = socketIOClient(this.state.endpoint)

        // socket.on is another method that checks for incoming events from the server
        // This method is looking for the event 'change color'
        // socket.on takes a callback function for the first argument
        socket.on('update quiz user result', (obj) => {
            // setting the color of our button
            obj.isSocket = true;
            this.update();
            // if (obj.QuizId === this.state.QuizId) {
            //     var results = [];
            //     var found = false;
            //     this.state.Results.forEach((element) => {
            //         if (element.QuizUserId === obj.QuizUserId) {
            //             element.Score += obj.Score;
            //             found = true;
            //         }
            //         results.push(element);
            //     });
            //     if (found === false) {
            //         results.push(obj);
            //     }
            //     this.setState((prevState, props) => ({
            //         Results: results
            //     }));
            // }
        })
    } **/

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default DashboardComponent;