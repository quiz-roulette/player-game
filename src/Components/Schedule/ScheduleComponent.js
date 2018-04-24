import React, { Component } from 'react';
import { Form, FormGroup, Col, Radio, FormControl, Checkbox, ControlLabel, Button } from 'react-bootstrap';
import Server from '../API/server'

class ScheduleComponent extends Component {
    constructor(props) {
        super(props);
        this.handleStartDateTimeChange = this.handleStartDateTimeChange.bind(this);
        this.handleEndDateTimeChange = this.handleEndDateTimeChange.bind(this);
        const { match: { params } } = props;
        this.state = {
            Id: params.id,
            Customer: "CustomerName2",
            Roles: "Company: APAC Head, Company: Admin Head",
            ClientPartner: "1451370",
            ISO: "Travel Industry, Manufacturing Industry",
            Start: 1524360492816,
            End: 1524360504859,
            FollowUp: "yes, 29th April 12pm",
            Solution: "Robotics, SMU Smart City - Elderly, SIA"
        }

        Server.getScheduleById(params.id).then((res) => {
            var newdata = res.data;
            var startdate = new Date(newdata.Start).toISOString();
            var startdotindex = startdate.indexOf('.');
            startdate = startdate.substring(0,startdotindex)
            var enddate = new Date(newdata.End).toISOString();
            var enddotindex = enddate.indexOf('.');
            enddate = enddate.substring(0,enddotindex)
            this.setState({
                Customer: newdata.Customer,
                Roles: newdata.Roles,
                ClientPartner: newdata.ClientPartner,
                ISO: newdata.ISO,
                Start: startdate,
                End: enddate,
                FollowUp: newdata.FollowUp,
                Solution: newdata.Solution
            })
        })
    }

    handleStartDateTimeChange(event){
        this.setState({ Start: event.target.value})
    }

    handleEndDateTimeChange(event){
        this.setState({ Start: event.target.value})
    }

    render() {
        return (<Form horizontal>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    Customer
              </Col>
                <Col sm={8}>
                    <FormControl type="text" value={this.state.Customer} placeholder="Tata Consultancy Serviec" />
                </Col>
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    Roles
              </Col>
                <Col sm={8}>
                    <FormControl type="text" value={this.state.Roles} placeholder="Smit: Intern, Jian Ming: Intern" />
                </Col>
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    Client Partner
              </Col>
                <Col sm={8}>
                    <FormControl type="text" value={this.state.ClientPartner} placeholder="Jay" />
                </Col>
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    ISO
              </Col>
                <Col sm={8}>
                    <FormControl type="text" value={this.state.ISO} placeholder="Manufacturing" />
                </Col>
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    Start
              </Col>
                <Col sm={8}>
                    <input type="datetime-local" value={this.state.Start} onChange={this.handleStartDateTimeChange}/>
                </Col>
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    End
              </Col>
                <Col sm={8}>
                    <input type="datetime-local" value={this.state.End} onChange={this.handleEndDateTimeChange}/>
                </Col>
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    Follow Up
              </Col>
                <Col sm={4}>
                    <Radio name="radioGroup" inline>
                        Yes
                        </Radio>{' '}
                    <Radio name="radioGroup" inline>
                        No
                        </Radio>
                </Col>
                <Col sm={4}>
                    <FormControl type="text" placeholder="Notes" value={this.state.FollowUp}/>
                </Col>
            </FormGroup>

            <FormGroup controlId="formControlsTextarea">
                <Col componentClass={ControlLabel} sm={2}>
                    Solution
              </Col>
                <Col sm={8}>
                    <FormControl componentClass="textarea" value={this.state.Solution} placeholder="solutions presented" />
                </Col>
            </FormGroup>

            <FormGroup>
                <Col smOffset={2} sm={8}>
                    <Button type="submit">Save</Button>
                </Col>
            </FormGroup>
        </Form>)
    }
}

export default ScheduleComponent;