import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Server from '../API/server'
import './QuizListComponent.css'

class QuizListComponent extends Component{
    constructor(props) {
        super(props);

        this.state = {
            QuizList: []
        }

        Server.getQuizList().then((res) => {
            this.setState({
                QuizList: res.data
            });
        })
    }

    render(){
        return this.renderQuizList();
    }

    renderQuizList(){
        const quizList = [];
        for(var i=0; i<this.state.QuizList.length; i++){
            quizList.push(<div className="quizlistitem"><Link to={'/quiz/'+this.state.QuizList[i].QuizId+"/"+this.state.QuizList[i].CategoryName} >{this.state.QuizList[i].QuizId}</Link></div>)
        }
        return(<div className="quizlist">{quizList}</div>)
    }
}

export default QuizListComponent;