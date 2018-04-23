import React, { Component } from 'react';
import { Form, FormGroup, Col,FormControl, Checkbox,ControlLabel,Button } from 'react-bootstrap';
import Server from '../API/server'

class SignInComponent extends Component {
    constructor(props) {
        super(props);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleuserName = this.handleuserName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

        this.state = {
            userName: "",
            Password: ""
        };
    }

    handleLogIn(event) {
        if (this.state.userName !== "" && this.state.Password !== "") {
            Server.LogIn(this.state.userName, this.state.Password).then((res) => {
                localStorage.setItem("l", "true");
                localStorage.setItem("u", this.state.userName);
                localStorage.setItem("p", this.state.Password);
            })
        }

    }

    handleuserName(event) {
        const un = event.target.value;
        this.setState((prevState, props) => ({
            userName: un
        }));
    }

    handlePassword(event) {
        const pw = event.target.value;
        this.setState((prevState, props) => ({
            Password: pw
        }));
    }
    render() {
        return (<Form horizontal>
            <FormGroup controlId="formHorizontalText">
                <Col componentClass={ControlLabel} sm={2}>
                    userName
                </Col>
                <Col sm={10}>
                    <FormControl type="text" placeholder="userName" onChange={this.handleuserName} />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                    Password
                </Col>
                <Col sm={10}>
                    <FormControl type="password" placeholder="Password" onChange={this.handlePassword} />
                </Col>
            </FormGroup>

            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <Checkbox>Remember me</Checkbox>
                </Col>
            </FormGroup>

            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <Button type="submit" onSubmit={this.handleLogIn}>Sign in</Button>
                </Col>
            </FormGroup>
        </Form>
        );
    }
}

export default SignInComponent;