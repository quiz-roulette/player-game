import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Jumbotron, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import './HomeComponent.css'
import Background from './logo.png'

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
        return (<Jumbotron className="jumbotron">
            <img  className="tatalogo" src={Background}/>
            <h1>Digital Tracker</h1>
            <p>
                <Button bsStyle="primary" onClick={this.handleLearnMore} >Log In</Button>
            </p>
        </Jumbotron>);
    }
}

export default withRouter(HomeComponent);