import React, { Component } from 'react';
import { Form, FormGroup, Col, Radio, FormControl, Checkbox, ControlLabel, Button } from 'react-bootstrap';
class ScheduleComponent extends Component {
    render() {
        return (<Form horizontal>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    Customer
              </Col>
                <Col sm={8}>
                    <FormControl type="text" placeholder="Tata Consultancy Serviec" />
                </Col>
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    Roles
              </Col>
                <Col sm={8}>
                    <FormControl type="text" placeholder="Smit: Intern, Jian Ming: Intern" />
                </Col>
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    Client Partner
              </Col>
                <Col sm={8}>
                    <FormControl type="text" placeholder="Jay" />
                </Col>
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    ISO
              </Col>
                <Col sm={8}>
                    <FormControl type="text" placeholder="Manufacturing" />
                </Col>
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    Start
              </Col>
                <Col sm={8}>
                    <input type="datetime-local" />
                </Col>
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <Col componentClass={ControlLabel} sm={2}>
                    End
              </Col>
                <Col sm={8}>
                    <input type="datetime-local" />
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
                    <FormControl type="text" placeholder="Notes" />
                </Col>
            </FormGroup>

            <FormGroup controlId="formControlsTextarea">
                <Col componentClass={ControlLabel} sm={2}>
                    Solution
              </Col>
                <Col sm={8}>
                    <FormControl componentClass="textarea" placeholder="solutions presented" />
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