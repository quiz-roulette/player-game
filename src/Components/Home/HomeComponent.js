import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Jumbotron, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import './HomeComponent.css'

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.handleLearnMore = this.handleLearnMore.bind(this);
    }

    handleLearnMore(event){
        event.preventDefault();
        this.props.history.push("/calendarview");
    }

    render() {
        return (<Jumbotron className="jumbotron">
            <h1>Digital Tracker</h1>
            <p>
                Designed by Digital Garage
            </p>
            <p>
                <Button bsStyle="primary" onClick={this.handleLearnMore} >Calendar View</Button>
            </p>
        </Jumbotron>);
    }
}

export default withRouter(HomeComponent);