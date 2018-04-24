import React, { Component } from 'react';
import { Form, FormGroup, Col,FormControl, Checkbox,ControlLabel,Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Server from '../API/server'

class SignUpComponent extends Component{
    constructor(){
        super();
        this.handleSignup = this.handleSignup.bind(this);
        this.handleuserName = this.handleuserName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleEmail = this.handleEmail.bind(this);

        this.state = {
            userName: "",
            Password: "",
            Email: ""
        };
    }

    handleSignup(event){
        event.preventDefault();
        if(this.state.userName !== "" && this.state.Email !== "" &&
        this.state.Password !==""){
            Server.signup(this.state.userName,this.state.Password,this.state.Emai).then((res) => {
                localStorage.setItem("l","true");
                localStorage.setItem("u",this.state.userName);
                localStorage.setItem("p",this.state.Password);
                this.props.history.push("/schedule");
            })
        }
        
    }

    handleuserName(event){
        const un = event.target.value;
        this.setState((prevState, props) => ({
            userName: un
        }));
    }

    handleEmail(event){
        const em = event.target.value;
        this.setState((prevState, props) => ({
            Email: em
        }));
    }

    handlePassword(event){
        const pw = event.target.value;
        this.setState((prevState, props) => ({
            Password: pw
        }));
    }

    render() {
        return (<Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                    Email
                </Col>
                <Col sm={10}>
                    <FormControl type="email" placeholder="Email" onChange={this.handleEmail}/>
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalText">
                <Col componentClass={ControlLabel} sm={2}>
                    Employer Id:
                </Col>
                <Col sm={10}>
                    <FormControl type="text" placeholder="userName" onChange={this.handleuserName}/>
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                    Password
                </Col>
                <Col sm={10}>
                    <FormControl type="password" placeholder="Password" onChange={this.handlePassword}/>
                </Col>
            </FormGroup>

            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <Checkbox>Remember me</Checkbox>
                </Col>
            </FormGroup>

            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <Button type="submit" onClick={this.handleSignup}>Sign up</Button>
                </Col>
            </FormGroup>
        </Form>
         ); 
    }
}

export default withRouter(SignUpComponent);