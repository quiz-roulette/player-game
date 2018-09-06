import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { SignInComponent, SignUpComponent,ProfileComponent } from '../index';

class AccountComponent extends Component {
    render() {
        if (localStorage.getItem('u')) return this.renderProfile();
        else return this.renderAuthenticate();
    }

    renderAuthenticate() {
        return (
            <div className="authenticateform">
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="Sign In">
                        <SignInComponent />
                    </Tab>
                    <Tab eventKey={2} title="Sign Up">
                        {/* <SignUpComponent /> */}
                        <h6>Coming Soon</h6>
                    </Tab>
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