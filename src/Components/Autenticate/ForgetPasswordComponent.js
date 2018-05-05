import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, Checkbox, ControlLabel, Button } from 'react-bootstrap';
import { withRouter,Link } from "react-router-dom";
import Server from '../API/server'
import './Common.css';

class ForgetPasswordComponent extends Component {
    constructor(props) {
        super(props);

        this.handleuserName = this.handleuserName.bind(this);
        this.handleRetrieveAccount = this.handleRetrieveAccount.bind(this);

        this.state = {
            userName: "",
            status: "new"
        };
    }


    handleuserName(event) {
        const un = event.target.value;
        this.setState((prevState, props) => ({
            userName: un
        }));
    }

    handleRetrieveAccount(event) {
        event.preventDefault();
        if (this.state.userName !== "") {
            Server.getAccountByName(this.state.userName).then((res) => {
                console.log('N', res);
                if (res.data === true || res.data === "true") {
                    this.setState({ status: 'success' });
                }
                else {
                    this.setState({ status: 'failure' });
                }
            }).catch((err) => {
                this.setState({ status: 'failure' });
            })
        }
        else{
            this.setState({ status: 'failure' });
        }
    }
    render() {
        if (this.state.status == "new") {
            return this.renderForm();
        }
        else if (this.state.status == "success") {
            return this.renderSuccess();
        }
        else {
            return this.renderFailure();
        }
    }

    renderForm() {
        return (
            <div className="authenticateform">
                <Form horizontal>
                    <FormGroup controlId="formHorizontalText">
                        <Col componentClass={ControlLabel} sm={3}>
                        </Col>
                        <Col sm={9}>
                            <p style={{ color: 'blue' }}>Please enter your employee ID to send reset password instructions.</p>
                        </Col>
                        <Col componentClass={ControlLabel} sm={3}>
                            Employee Id:
                        </Col>
                        <Col sm={9}>
                            <FormControl type="text" placeholder="employee id" onChange={this.handleuserName} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={3} sm={8}>
                            <Button onClick={this.handleRetrieveAccount}>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    renderSuccess() {
        return (
            <div className="message">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                    <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                    <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                </svg><br />
                <p>Reset password link has been sent. Please check your email and follow the mentioned steps.</p>
            </div>);
    }

    renderFailure() {
        return (
            <div className="message">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                    <circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                    <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3" />
                    <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2" />
                </svg><br />
                <p>Something went wrong! Please try again later or contact the site administrator</p>
            </div>
        );
    }
}

export default ForgetPasswordComponent;