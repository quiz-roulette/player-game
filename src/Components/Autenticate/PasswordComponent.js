import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, Checkbox, ControlLabel, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Server from '../API/server'
import './Common.css';

class PasswordComponent extends Component {
    constructor(props) {
        super(props);

        this.handleuserName = this.handleuserName.bind(this);
        this.handleRetrieveAccount = this.handleRetrieveAccount.bind(this);

        this.state = {
            userName: "",
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
                    this.props.history.push("/");
                }
                else {
                    //Handle
                }
            }).catch((err) => {
                //Handle
            })
        }
    }
    render() {
        return this.renderForm();
    }

    renderForm() {
        return (
            <div className="authenticateform">
                <Form horizontal>
                    <FormGroup controlId="formHorizontalText">
                        <Col componentClass={ControlLabel} sm={3}>
                        </Col>
                        <Col sm={9}>
                            <p style={{ color: 'red' }}>Please enter your employee ID to search for your account.</p>
                        </Col>
                        <Col componentClass={ControlLabel} sm={3}>
                            Employer Id:
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
}

export default PasswordComponent;