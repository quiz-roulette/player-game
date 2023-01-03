import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Button, Col, Row, Grid } from 'react-bootstrap'
import socketIOClient from 'socket.io-client'
import Server from '../API/server'
import './QuizListComponent.css'
import LoadComponent from '../Helper/LoadComponent';
import Alert from 'react-s-alert';

class QuizListComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            QuizList: [],
            endpoint: process.env.REACT_APP_SOCKET_IO_URL,
            loading: false,
            SocketQuizIdList: []
        }

        this.updateQuizList();
    }

    updateQuizList() {
        this.setState({ loading: true })
        Server.getQuizByGroupByUserId(localStorage.getItem('u')).then((res) => {
            console.log(res.data);
            this.setState({
                QuizList: res.data,
                loading: false
            });

        }).catch((err) => {
            this.setState({
                loading: false
            });
            // Alert.error('Unable to retreive quiz', {
            //     position: 'top-right',
            //     effect: 'slide',
            //     timeout: 'none'
            // });
        })
    }

    componentDidMount() {
        const socket = socketIOClient(this.state.endpoint)

        // socket.on is another method that checks for incoming events from the server
        // This method is looking for the event 'change color'
        // socket.on takes a callback function for the first argument
        socket.on('start quiz', (obj) => {
            // setting the color of our button
            obj.isSocket = true;
            console.log(obj);
            var arr = [obj.QuizId]
            this.setState((prevState, props) => {
                return { SocketQuizIdList: prevState.SocketQuizIdList.concat(arr) };
            });
            this.updateQuizList();

        })
    }

    // // method for emitting a socket.io event
    // send = () => {
    //     const socket = socketIOClient(this.state.endpoint)

    //     // this emits an event to the socket (your server) with an argument of 'red'
    //     // you can make the argument any color you would like, or any kind of data you want to send.
    //     console.log(socket);
    //     socket.emit('buzzer pressed', 'red')
    //     // socket.emit('change color', 'red', 'yellow') | you can have multiple arguments
    // }

    render() {
        if (this.state.loading === true) return this.renderLoading();
        else return this.renderQuizList();
    }

    renderLoading() {
        return (<LoadComponent />)
    }

    handleClick(i, j) {
        this.props.history.push("/quiz/" + i + "/" + j);
    }

    handleDashboardClick(i) {
        this.props.history.push("/dashboard/" + i);
    }

    renderQuizList() {
        const quizList = [];
        console.log(this.state);
        for (var i = 0; i < this.state.QuizList.length; i++) {
            const qId = this.state.QuizList[i].QuizId;
            const qCn = this.state.QuizList[i].CategoryName;
            var isSocket = this.state.SocketQuizIdList.includes(qId);
            var classForSocket = "quizlistitem";
            classForSocket += isSocket ? " animatequizitem" : "";
            quizList.push(<Col sm={6} md={3}>
                <div className={classForSocket} key={i} style={{ borderColor: new Date(this.state.QuizList[i].StartDateTime).toDateString() === new Date().toDateString() ? "maroon" : "black" }}
                >
                    <h3 className="quizlistitemtitle">{this.state.QuizList[i].QuizId}</h3>
                    <div className="quizlistitemmid">
                        <span className="quizlistitemstartdate">{new Date(this.state.QuizList[i].StartDateTime).toDateString()}</span>
                        {/* <span className="quizlistitemcategory">{qCn}</span> */}
                    </div>
                    <div className="quizlistitemmid">
                        <span className="quizlistitemstartdate">{qCn}</span>
                    </div>
                    <div className="quizlistitemfooter">
                        <Button className="quizlistitemdashboardbtn" bsStyle="default" onClick={(e) => this.handleDashboardClick(qId)}>Dashboard</Button>
                        <Button className="quizlistitemplaybtn" bsStyle="primary" onClick={(e) => this.handleClick(qId, qCn)} >Play</Button>
                    </div>
                    <br />
                </div>
            </Col>
            )
        }
        if (quizList.length > 0) {
            return (<Grid>
                <Row className="show-grid">
                    {quizList}
                </Row>
            </Grid>)
        }
        else{
            return (<LoadComponent />)//return (<h6>No Quiz Found.</h6>)
        }

    }
}

export default withRouter(QuizListComponent);