import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Server from '../API/server'
import './Common.css';
import { Link } from 'react-router-dom'
import Alert from 'react-s-alert';

class SignInComponent extends Component {
    constructor(props) {
        super(props);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleuserName = this.handleuserName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        console.log(this.props.token);
        this.state = {
            userName: "",
            Password: this.props.token,
            loading: false,
            token: this.props.token
        };

    }

    handleLogIn(event) {
        event.preventDefault();
        this.setState({ loading: true })
        console.log(event);
        if (this.state.userName !== "" && this.state.Password !== "") {
            var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            if (!format.test(this.state.userName)) {
                console.log(this.state);
                try {
                    Server.addOneTimeQuizUser(this.state.userName, this.state.Password).then((res) => {
                        console.log(res);
                        if (res.data === true || res.data === "true") {
                            localStorage.setItem("l", "true");
                            //Token_Username
                            localStorage.setItem("u", this.state.Password + '_' + this.state.userName);
                            localStorage.setItem('qt',this.state.Password);
                            // localStorage.setItem("p", this.state.Password);
                            // this.setState({ loading: false})
                            
                            Server.getOneTimeQuiz(this.state.Password).then((res1) => {
                                // this.props.history.push("/quiz/" + res1.data.QuizId + "/" + res1.data.CategoryName);
                                var url = "quiz/" + res1.data.QuizId + "/" + res1.data.CategoryName;

                                this.props.history.push('/avatarselection/'+encodeURIComponent(url));
                            })
                        }
                        else {
                            this.setState({ loading: false })
                            Alert.error('Either username or token is wrong', {
                                position: 'top-right',
                                effect: 'slide',
                                timeout: 'none'
                            });
                        }
                    }).catch((err) => {
                        this.setState({ loading: false })
                        Alert.error('Either username or token is wrong', {
                            position: 'top-right',
                            effect: 'slide',
                            timeout: 'none'
                        });
                    })
                } catch (error) {
                    this.setState({ loading: false })
                    Alert.error(error, {
                        position: 'top-right',
                        effect: 'slide',
                        timeout: 'none'
                    });
                }

            }
            else {
                this.setState({ loading: false })
                Alert.error('Username cannot contain special characters', {
                    position: 'top-right',
                    effect: 'slide',
                    timeout: 'none'
                });
            }
        }
        else {
            this.setState({ loading: false })
            Alert.error('Username or token cannot be empty', {
                position: 'top-right',
                effect: 'slide',
                timeout: 'none'
            });
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
        return this.renderForm();
    }

    renderForm() {
        return (
            <div className="authenticateform">
                <Form horizontal>
                    <FormGroup controlId="formHorizontalText">
                        <Col componentClass={ControlLabel} sm={3}>
                            Username:
                        </Col>
                        <Col sm={9}>
                            <FormControl type="text" placeholder="Username" disabled={this.state.loading} onChange={this.handleuserName} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={3}>
                            Token:
                        </Col>
                        <Col sm={9}>
                            <FormControl type="text" placeholder="Token" value={this.state.token} disabled={this.state.loading} onChange={this.handlePassword} /><br />
                            <span className="extranote">Token will be provided by the quiz administrator.</span>
                        </Col>
                    </FormGroup>
                    <br />
                    {/* <FormGroup controlId="formHorizontalPassword">
                        <Col xsHidden componentClass={ControlLabel} sm={3}></Col>
                        <Col xs={6} sm={3}>
                            <Link to='/forgetPassword'>Forget Password</Link>
                        </Col>
                        <Col xs={6} sm={6} className="floatright">
                            <Link to='/account'>Create Account</Link>
                        </Col>
                    </FormGroup> */}
                    <FormGroup>
                        <Col smOffset={3} sm={8}>
                            <Button onClick={this.handleLogIn} disabled={this.state.loading}>{this.state.loading ? "Authenticating..." : "Play"}</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default withRouter(SignInComponent);