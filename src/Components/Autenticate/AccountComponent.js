import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { SignInComponent, SignUpComponent, ProfileComponent, OneTimeQuizComponent } from '../index';
import Server from '../API/server';

class AccountComponent extends Component {

    constructor(props) {
        super(props);
        const { match: { params } } = props;

        if(params && params.token != undefined){
            localStorage.clear();
        }
        this.state = {
            defaultActiveKey: 2,
            token: params.token
        }

        Server.getBlank().then((res) => {
            console.log("Activated Server");
        })
    }
    render() {
        console.log(this.state);
        if (localStorage.getItem('u')) return this.renderProfile();
        else return this.renderAuthenticate();
    }

    renderAuthenticate() {
        console.log(this.state);
        return (
            <div className="authenticateform">
                <h2 className="title">Quiz R<svg width="40px" height="40px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-wheel">
                    <g transform="rotate(66 50 50)">
                        <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
                        <ellipse cx="50" cy="50" ng-attr-rx="{{config.radiusOut}}" ry="0.1" fill="none" ng-attr-stroke="{{config.c2}}" ng-attr-stroke-width="{{config.width}}" transform="rotate(0 50 50)" rx="30" stroke="#fac090" stroke-width="5"></ellipse>
                        <ellipse cx="50" cy="50" ng-attr-rx="{{config.radiusOut}}" ry="0.1" fill="none" ng-attr-stroke="{{config.c2}}" ng-attr-stroke-width="{{config.width}}" transform="rotate(45 50 50)" rx="30" stroke="#fac090" stroke-width="5"></ellipse>
                        <ellipse cx="50" cy="50" ng-attr-rx="{{config.radiusOut}}" ry="0.1" fill="none" ng-attr-stroke="{{config.c2}}" ng-attr-stroke-width="{{config.width}}" transform="rotate(90 50 50)" rx="30" stroke="#fac090" stroke-width="5"></ellipse>
                        <ellipse cx="50" cy="50" ng-attr-rx="{{config.radiusOut}}" ry="0.1" fill="none" ng-attr-stroke="{{config.c2}}" ng-attr-stroke-width="{{config.width}}" transform="rotate(135 50 50)" rx="30" stroke="#fac090" stroke-width="5"></ellipse>
                    </g>
                    <circle cx="50" cy="50" ng-attr-r="{{config.radiusOut}}" fill="none" ng-attr-stroke="{{config.c1}}" ng-attr-stroke-width="{{config.width}}" r="30" stroke="#ff7c81" stroke-width="5"></circle>
                    <circle cx="50" cy="50" ng-attr-r="{{config.radiusIn}}" ng-attr-fill="{{config.c3}}" ng-attr-stroke="{{config.c2}}" ng-attr-stroke-width="{{config.width}}" r="10" fill="#ffffcb" stroke="#fac090" stroke-width="5"></circle>
                </svg>ulette!</h2>
                <Tabs defaultActiveKey={this.state.token ? 2 : 2} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="Sign In">
                        <SignInComponent />
                    </Tab>
                    <Tab eventKey={2} title="One Time Quiz(Beta)">
                        <OneTimeQuizComponent token={this.state.token} />
                        {/* <h6>Coming Soon</h6> */}
                    </Tab>
                    {/* <Tab eventKey={3} title="Sign Up">
                        <SignUpComponent />
                        <h6>Coming Soon</h6>
                    </Tab> */}
                </Tabs>
            </div>);
    }

    renderProfile() {
        return (<div className="authenticateform">
            <ProfileComponent />
        </div>)
    }
}

export default AccountComponent;