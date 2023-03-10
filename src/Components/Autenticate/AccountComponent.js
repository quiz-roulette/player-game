import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { SignInComponent, SignUpComponent, ProfileComponent, OneTimeQuizComponent,SimLoginComponent } from '../index';
import Server from '../API/server';
import Alert from 'react-s-alert';

class AccountComponent extends Component {

    constructor(props) {
        super(props);
        const { match: { params } } = props;

        if (params && params.token != undefined) {
            console.log(params);
            localStorage.clear();
        }
        this.state = {
            defaultActiveKey: 2,
            token: params.token,
            sim: params.sim
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
                <div className="svgform">
                    <svg height="40pt" viewBox="0 0 496 496" width="40pt" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                        <linearGradient id="a" gradientTransform="matrix(8 0 0 -8 -8 504)" gradientUnits="userSpaceOnUse" x1="32" x2="32" y1="1" y2="63">
                            <stop offset="0" stop-color="#9f2fff" ></stop>
                            <stop offset="1" stop-color="#0bb1d3" ></stop>
                        </linearGradient>
                        <path d="m216 280h16c0 8.824219 7.175781 16 16 16s16-7.175781 16-16h16c0 17.648438-14.351562 32-32 32s-32-14.351562-32-32zm-144 154.59375c0-24.144531 15.382812-45.496094 38.296875-53.121094l81.703125-27.242187v-22.40625c-13.6875-11.320313-23.824219-26.726563-28.710938-44.304688-19.816406-2.367187-35.289062-19.078125-35.289062-39.519531v-64c0-46.089844 26.910156-88.65625 68.566406-108.449219l6.867188 14.457031c-36.105469 17.152344-59.433594 54.046876-59.433594 93.992188v32.207031c4.671875-3.535156 10.054688-6.183593 16-7.390625v-40.816406h16v19.847656c19.175781 13.601563 41.449219 22.566406 64.726562 25.886719l3.96875.570313c-1.261718-8.761719.121094-17.832032 4.144532-25.878907l4.289062-8.570312 7.664063 5.753906c17.582031 13.183594 37.894531 22.894531 59.199219 28.375v-21.984375h16v16.808594c5.945312 1.214844 11.328124 3.855468 16 7.390625v-32.199219c0-39.945312-23.328126-76.839844-59.433594-93.992188l6.867187-14.457031c41.652344 19.792969 68.566407 62.359375 68.566407 108.449219v64c0 20.441406-15.472657 37.160156-35.289063 39.519531-4.886719 17.578125-15.023437 32.984375-28.710937 44.304688v22.40625l81.710937 27.242187c22.90625 7.625 38.289063 28.976563 38.289063 53.121094v61.40625h-352v-61.40625zm226.160156-65.441406-37.824218 37.824218 38.25 27.320313 12.191406-60.945313zm37.839844-143.679688v38.527344c0 2.238281-.167969 4.433594-.335938 6.632812 9.464844-3.21875 16.335938-12.089843 16.335938-22.632812 0-10.414062-6.710938-19.214844-16-22.527344zm-175.664062 45.160156c-.167969-2.199218-.335938-4.394531-.335938-6.632812v-38.527344c-9.289062 3.3125-16 12.113282-16 22.527344 0 10.535156 6.871094 19.414062 16.335938 22.632812zm87.664062 65.367188c39.695312 0 72-32.296875 72-72v-33.734375c-21.105469-4.9375-41.457031-13.480469-59.585938-25.394531-.589843 5.28125.320313 10.703125 2.746094 15.542968l6.832032 13.65625-31.519532-4.496093c-22.128906-3.160157-43.425781-10.949219-62.464844-22.589844v57.015625c-.007812 39.703125 32.296876 72 71.992188 72zm-40 6.289062v14.398438l40 40 40-40v-14.398438c-12.015625 6.167969-25.59375 9.710938-40 9.710938s-27.984375-3.550781-40-9.710938zm-22.769531 31.0625 12.195312 60.945313 38.246094-27.320313-37.824219-37.824218zm-97.230469 106.648438h48v-32h16v32h192v-32h16v32h48v-45.40625c0-17.242188-10.992188-32.496094-27.34375-37.945312l-54.585938-18.191407-16.644531 83.246094-61.417969-43.871094-61.414062 43.871094-16.648438-83.246094-54.585937 18.191407c-16.359375 5.457031-27.351563 20.703124-27.351563 37.945312v45.40625zm120-232c4.414062 0 8-3.585938 8-8s-3.585938-8-8-8-8 3.585938-8 8 3.585938 8 8 8zm80 0c4.414062 0 8-3.585938 8-8s-3.585938-8-8-8-8 3.585938-8 8 3.585938 8 8 8zm168-248c-22.054688 0-40 17.945312-40 40v16h16v-16c0-13.230469 10.769531-24 24-24s24 10.769531 24 24v4.777344c0 5.429687-1.863281 10.757812-5.257812 14.992187l-26.742188 33.429688v26.800781h16v-21.191406l23.230469-29.039063c5.65625-7.066406 8.769531-15.9375 8.769531-24.992187v-4.777344c0-22.054688-17.945312-40-40-40zm8 136h-16v16h16zm-80 64v16h16v-16c0-13.230469 10.769531-24 24-24s24 10.769531 24 24v4.777344c0 5.429687-1.863281 10.757812-5.257812 14.992187l-26.742188 33.429688v26.800781h16v-21.191406l23.230469-29.039063c5.65625-7.066406 8.769531-15.9375 8.769531-24.992187v-4.777344c0-22.054688-17.945312-40-40-40s-40 17.945312-40 40zm48 96h-16v16h16zm-176-197.191406 23.230469-29.039063c5.65625-7.066406 8.769531-15.9375 8.769531-24.992187v-4.777344c0-22.054688-17.945312-40-40-40s-40 17.945312-40 40v16h16v-16c0-13.230469 10.769531-24 24-24s24 10.769531 24 24v4.777344c0 5.429687-1.863281 10.757812-5.257812 14.992187l-26.742188 33.429688v26.800781h16zm-16 53.191406h16v-16h-16zm-149.257812-92.230469-26.742188 33.429688v26.800781h16v-21.191406l23.230469-29.039063c5.65625-7.066406 8.769531-15.9375 8.769531-24.992187v-4.777344c0-22.054688-17.945312-40-40-40s-40 17.945312-40 40v16h16v-16c0-13.230469 10.769531-24 24-24s24 10.769531 24 24v4.777344c0 5.421875-1.863281 10.75-5.257812 14.992187zm-10.742188 76.230469h-16v16h16zm-64 64c0-13.230469 10.769531-24 24-24s24 10.769531 24 24v4.777344c0 5.429687-1.863281 10.757812-5.257812 14.992187l-26.742188 33.429688v26.800781h16v-21.191406l23.230469-29.039063c5.65625-7.066406 8.769531-15.9375 8.769531-24.992187v-4.777344c0-22.054688-17.945312-40-40-40s-40 17.945312-40 40v16h16zm16 112h16v-16h-16zm0 0" fill="url(#a)" >
                        </path>
                    </svg>
                    <h4 style={{ fontStyle: "oblique" }}>Quiz Roulette</h4>
                </div>
                {/* <h2 className="title">Quiz R<svg width="40px" height="40px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-wheel">
                    <g transform="rotate(66 50 50)">
                        <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
                        <ellipse cx="50" cy="50" ng-attr-rx="{{config.radiusOut}}" ry="0.1" fill="none" ng-attr-stroke="{{config.c2}}" ng-attr-stroke-width="{{config.width}}" transform="rotate(0 50 50)" rx="30" stroke="#fac090" stroke-width="5"></ellipse>
                        <ellipse cx="50" cy="50" ng-attr-rx="{{config.radiusOut}}" ry="0.1" fill="none" ng-attr-stroke="{{config.c2}}" ng-attr-stroke-width="{{config.width}}" transform="rotate(45 50 50)" rx="30" stroke="#fac090" stroke-width="5"></ellipse>
                        <ellipse cx="50" cy="50" ng-attr-rx="{{config.radiusOut}}" ry="0.1" fill="none" ng-attr-stroke="{{config.c2}}" ng-attr-stroke-width="{{config.width}}" transform="rotate(90 50 50)" rx="30" stroke="#fac090" stroke-width="5"></ellipse>
                        <ellipse cx="50" cy="50" ng-attr-rx="{{config.radiusOut}}" ry="0.1" fill="none" ng-attr-stroke="{{config.c2}}" ng-attr-stroke-width="{{config.width}}" transform="rotate(135 50 50)" rx="30" stroke="#fac090" stroke-width="5"></ellipse>
                    </g>
                    <circle cx="50" cy="50" ng-attr-r="{{config.radiusOut}}" fill="none" ng-attr-stroke="{{config.c1}}" ng-attr-stroke-width="{{config.width}}" r="30" stroke="#ff7c81" stroke-width="5"></circle>
                    <circle cx="50" cy="50" ng-attr-r="{{config.radiusIn}}" ng-attr-fill="{{config.c3}}" ng-attr-stroke="{{config.c2}}" ng-attr-stroke-width="{{config.width}}" r="10" fill="#ffffcb" stroke="#fac090" stroke-width="5"></circle>
                </svg>ulette!</h2> */}
                <Tabs defaultActiveKey={this.state.token ? 2 : 2} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="Sign In">
                        <SignInComponent />
                    </Tab>
                    <Tab eventKey={2} title="One Time Quiz(Beta)">
                        {
                            this.state.sim ? 
                            <SimLoginComponent token={this.state.token} /> :
                            <OneTimeQuizComponent token={this.state.token} />
                        }
                        {/* <h6>Coming Soon</h6> */}
                    </Tab>
                    {/* <Tab eventKey={3} title="Sign Up">
                        <SignUpComponent />
                        <h6>Coming Soon</h6>
                    </Tab> */}
                </Tabs>
            </div >);
    }

    renderProfile() {
        return (<div className="authenticateform">
            <ProfileComponent />
        </div>)
    }
}

export default AccountComponent;