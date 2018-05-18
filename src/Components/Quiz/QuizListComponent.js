import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import Server from '../API/server'
import './QuizListComponent.css'

class QuizListComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            QuizList: [],
            endpoint: "https://axperience.herokuapp.com/:8881"
        }

        Server.getQuizList().then((res) => {
            this.setState({
                QuizList: res.data
            });
        })
    }

    // method for emitting a socket.io event
    send = () => {
        const socket = socketIOClient(this.state.endpoint)

        // this emits an event to the socket (your server) with an argument of 'red'
        // you can make the argument any color you would like, or any kind of data you want to send.
        console.log(socket);
        socket.emit('buzzer pressed', 'red')
        // socket.emit('change color', 'red', 'yellow') | you can have multiple arguments
    }

    render() {
        return this.renderQuizList();
    }

    renderQuizList() {
        const quizList = [];
        const socket = socketIOClient(this.state.endpoint)
    
        // socket.on is another method that checks for incoming events from the server
        // This method is looking for the event 'change color'
        // socket.on takes a callback function for the first argument
        socket.on('buzzer pressed', (color) => {
          // setting the color of our button
          console.log(color);
          document.body.style.backgroundColor = color
        })
        for (var i = 0; i < this.state.QuizList.length; i++) {
            quizList.push(<div className="quizlistitem"><Link to={'/quiz/' + this.state.QuizList[i].QuizId + "/" + this.state.QuizList[i].CategoryName} >{this.state.QuizList[i].QuizId}</Link></div>)
        }
        return (<div className="quizlist">{quizList}<br/> <button onClick={() => this.send()}>Change Color</button></div>)
    }
}

export default QuizListComponent;