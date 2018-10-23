import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Server from '../API/server'
import './Common.css'
import Alert from 'react-s-alert';

class SignUpComponent extends Component {
    constructor() {
        super();
        this.handleSignup = this.handleSignup.bind(this);
        this.handleuserName = this.handleuserName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);

        this.state = {
            userName: "",
            Password: "",
            Email: "",
            ConfirmPassword: ""
        };
    }

    handleSignup(event) {
        event.preventDefault();
        this.setState({ loading: true})
        var password = this.state.Password;
        if (/@mymail.sim.edu.sg\s*$/.test(this.state.Email)) {
            if (password === this.state.ConfirmPassword) {
                if (password && password != "" && password.length >= 6 && password.length <= 10) {
                    Server.signup(this.state.Email, password).then((res) => {
                        localStorage.setItem("l", "true");
                        localStorage.setItem("u", this.state.Email);
                        this.props.history.push("/account");
                    });
                }
                else {
                    this.setState({ loading: false })
                    Alert.error('Password must be atleast 6 letters and less than 10 letters', {
                        position: 'top-right',
                        effect: 'slide',
                        timeout: 'none'
                    });
                }
            }
            else{
                this.setState({ loading: false })
                Alert.error('Password does not match', {
                    position: 'top-right',
                    effect: 'slide',
                    timeout: 'none'
                });
            }
        }
        else {
            this.setState({ loading: false })
            Alert.error('Invalid Email address. It must be SIM mymail ID', {
                position: 'top-right',
                effect: 'slide',
                timeout: 'none'
            });
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

    handleCodeChange(event) {
        const code = event.target.value;
        this.setState((prevState, props) => ({
            Code: code
        }));
    }

    render() {
        return (
            <div className="authenticateform">
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={3} style={{textAlign: 'left'}}>
                            Email
                </Col>
                        <Col sm={9}>
                            <FormControl type="email" placeholder="SIM Mymail ID" onChange={this.handleEmail} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalText">
                        <Col componentClass={ControlLabel} sm={3} style={{textAlign: 'left'}}>
                            SIM ID
                </Col>
                        <Col sm={9}>
                            <FormControl type="text" placeholder="SIM ID" onChange={this.handleuserName} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={3} style={{textAlign: 'left'}}>
                            Password
                </Col>
                        <Col sm={9}>
                            <FormControl type="password" placeholder="Password" onChange={this.handlePassword} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={3} style={{textAlign: 'left'}}>
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
                            <Button type="submit" onClick={this.handleSignup}disabled={this.state.loading}>{this.state.loading ? "Loading..." : "Sign Up"}</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default withRouter(SignUpComponent);