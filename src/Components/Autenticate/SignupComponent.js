import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Server from '../API/server'
import './Common.css'

class SignUpComponent extends Component {
    constructor() {
        super();
        this.handleSignup = this.handleSignup.bind(this);
        this.handleuserName = this.handleuserName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
	this.handleConfirmPassword = this.handleConfirmPassword.bind(this);

        this.state = {
            userName: "",
            Password: "",
            Email: "",
            ConfirmPassword: ""
        };
    }

    handleSignup(event) {
        event.preventDefault();
        if (this.state.userName !== "" && this.state.Email !== "" &&
            this.state.Password !== "") {
            if (this.state.Password === this.state.ConfirmPassword) {
                Server.signup(this.state.userName, this.state.Password, this.state.Email).then((res) => {
                    localStorage.setItem("l", "true");
                    localStorage.setItem("u", this.state.userName);
                    localStorage.setItem("p", this.state.Password);
                    this.props.history.push("/schedule");
                })
            }
        }

    }

    handleuserName(event) {
        const un = event.target.value;
        this.setState((prevState, props) => ({
            userName: un
        }));
    }

    handleEmail(event) {
        const em = event.target.value;
        this.setState((prevState, props) => ({
            Email: em
        }));
    }

    handlePassword(event) {
        const pw = event.target.value;
        this.setState((prevState, props) => ({
            Password: pw
        }));
    }

    handleConfirmPassword(event) {
        const pw = event.target.value;
        this.setState((prevState, props) => ({
            ConfirmPassword: pw
        }));
    }

    render() {
        return (
        <div className="authenticateform">
        <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={3}>
                    Email
                </Col>
                <Col sm={9}>
                    <FormControl type="email" placeholder="Email" onChange={this.handleEmail} />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalText">
                <Col componentClass={ControlLabel} sm={3}>
                    Employer Id
                </Col>
                <Col sm={9}>
                    <FormControl type="text" placeholder="employee id" onChange={this.handleuserName} />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={3}>
                    Password
                </Col>
                <Col sm={9}>
                    <FormControl type="password" placeholder="Password" onChange={this.handlePassword} />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={3}>
                    Confirm Password
                </Col>
                <Col sm={9}>
                    <FormControl type="password" placeholder="Confirm Password" onChange={this.handleConfirmPassword} />
                </Col>
            </FormGroup>

            {/* <FormGroup>
                <Col smOffset={2} sm={9}>
                    <Checkbox>Remember me</Checkbox>
                </Col>
            </FormGroup> */}

            <FormGroup>
                <Col smOffset={6} sm={2}>
                    <Button type="submit" onClick={this.handleSignup}>Sign up</Button>
                </Col>
            </FormGroup>
        </Form>
        </div>
        );
    }
}

export default withRouter(SignUpComponent);