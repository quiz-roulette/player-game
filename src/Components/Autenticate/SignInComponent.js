import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, Checkbox, ControlLabel, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Server from '../API/server'

class SignInComponent extends Component {
    constructor(props) {
        super(props);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleuserName = this.handleuserName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

        this.state = {
            userName: "",
            Password: "",
            loading: false
        };
    }

    handleLogIn(event) {
        event.preventDefault();
        // this.setState((props,prevState) =>{
        //     loading: true
        // });
        console.log(event);
        if (this.state.userName !== "" && this.state.Password !== "") {
            console.log(this.state);
            Server.signin(this.state.userName, this.state.Password).then((res) => {
                console.log(res);
                if (res.data === true || res.data === "true") {
                    localStorage.setItem("l", "true");
                    localStorage.setItem("u", this.state.userName);
                    localStorage.setItem("p", this.state.Password);
                    this.props.history.push("/schedule");
                }
                else {
                    //Handle
                }
            }).catch((err) => {
                //Handle
            })
        }

        // this.setState((props,prevState) =>{
        //     loading: false
        // })

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
        if (this.state.loading) return this.renderLoading();
        else return this.renderForm();
    }

    renderForm() {
        return (<Form horizontal>
            <FormGroup controlId="formHorizontalText">
                <Col componentClass={ControlLabel} sm={2}>
                    Username
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
                    <Button onClick={this.handleLogIn}>Sign in</Button>
                </Col>
            </FormGroup>
        </Form>
        );
    }

    renderLoading() {
        return (<Form horizontal>
            <FormGroup controlId="formHorizontalText">
                <Col componentClass={ControlLabel} sm={2}>
                    Username
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
                    <Button type="submit" disabled>Loading</Button>
                </Col>
            </FormGroup>
        </Form>)
    }
}

export default withRouter(SignInComponent);