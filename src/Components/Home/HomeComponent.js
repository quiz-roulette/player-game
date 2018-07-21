import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import './HomeComponent.css'
import { AnalyticsComponent } from '..';

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.handleLearnMore = this.handleLearnMore.bind(this);
    }

    handleLearnMore(event){
        event.preventDefault();
        this.props.history.push("/login");
    }

    render() {
        return (
        <div>
        <Jumbotron className="jumbotron">
            <h1 className="title">Quiz Roulette</h1>
            <p>
                <Button bsStyle="primary" onClick={this.handleLearnMore} >Play Now</Button>
            </p>
        </Jumbotron>
        <AnalyticsComponent/>
        </div>);
    }
}

export default withRouter(HomeComponent);