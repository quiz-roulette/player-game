import React, { Component } from 'react';
import Server from '../API/server'
import { Table, thead, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';
import './QuizUserSummaryComponent.css'
class QuizUserSummaryComponent extends Component {

    constructor() {
        super();
        this.renderTable = this.renderTable.bind(this);
        this.state = {
            records: []
        }
        Server.getQuizUserSummary(localStorage.getItem('u')).then((res) => {
            console.log(res);
            this.setState({
                records: res.data
            });
        })
    }

    render() {
        if(this.state.records.length > 0) return this.renderTable();
        else return (<h1></h1>);
    }

    renderTable(){
        var rows = [];
        for (var i = 0; i < this.state.records.length; i++) {
            rows.push(
                <tr>
                    <td>{this.state.records[i].QuizId}</td>
                    <td>{this.state.records[i].Score}</td>
                    <td>{this.state.records[i].TimeTaken}</td>
                </tr>
            )
        }
        console.log(rows);
        return (
            <div>
                <h4 className="quiz-summary-title">Past Score Summary</h4>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>Quiz Id</th>
                            <th>Score</th>
                            <th>Time Taken</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </div>);
    }
}

export default QuizUserSummaryComponent;