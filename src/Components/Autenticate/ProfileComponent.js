import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import './Common.css';
import { QuizListComponent } from '../index';

class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleViewSchedule = this.handleViewSchedule.bind(this);
    }

    handleLogout(event){
        localStorage.clear();
        this.props.history.push("/account");
    }

    handleViewSchedule(event){
        this.props.history.push("/quizlist");
    }

    render() {
        return (<div className="authenticateform">
        <Button className="logout-button" onClick={this.handleLogout}>Logout</Button>
        <h1>Hi, {localStorage.getItem('u')}</h1>
        <QuizListComponent/>
    </div>);
    }
}

export default withRouter(ProfileComponent);