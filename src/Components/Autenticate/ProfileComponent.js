import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import './Common.css';
import { QuizListComponent, QuizUserSummaryComponent } from '../index';
import Server from '../API/server'
import { emitOnlineUser } from '../API/socket';
import Alert from 'react-s-alert';

class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleViewSchedule = this.handleViewSchedule.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
        this.handleConfirmSelection = this.handleConfirmSelection.bind(this);
        var name = localStorage.getItem('u').match(/^([^@]*)@/);
        if (name) name = name[1];
        this.state = {
            show: false,
            avatars: [],
            DisplayName: name != null ? name : localStorage.getItem('u'),
            selectedAvatarImage: '',
            UserAvatar: ''
        }

        Server.getAvatars().then((res) => {
            this.setState({
                avatars: res.data
            })
        });

        Server.getQuizUserAvatar(localStorage.getItem('u')).then((res) => {
            if (res.data) {
                this.setState({
                    UserAvatar: res.data
                })
            }
            else {
                this.setState({
                    show: true
                })
            }
        })

        emitOnlineUser({ QuizUserId: localStorage.getItem('u') })
    }

    handleLogout(event) {
        localStorage.clear();
        this.props.history.push("/account");
    }

    handleViewSchedule(event) {
        this.props.history.push("/quizlist");
    }

    handleClose(event) {
        if (this.state.UserAvatar != '') {
            this.setState({
                show: false
            })
        }
        else {
            Alert.error('must select atleast one avatar', {
                position: 'top-right',
                effect: 'slide',
                timeout: 'none'
            });
        }
    }

    handleChangeAvatar(event) {
        this.setState({
            show: true
        })
    }

    handleOnChangeAvatar(image) {
        this.setState({
            selectedAvatarImage: image
        })
    }

    handleConfirmSelection(event) {
        if (this.state.selectedAvatarImage != '') {
            this.setState({
                UserAvatar: this.state.selectedAvatarImage
            })
            Server.updateUserAvatar(localStorage.getItem('u'), this.state.selectedAvatarImage).then((res) => {
                this.setState({
                    show: false
                })
            })
        }
    }

    render() {
        const rows = [];
        if (this.state.avatars.length > 0) {
            this.state.avatars.forEach(element => {
                rows.push(
                    <li className="avatarli">
                        <input className="avatarinput" type='radio' value='1' name='radio' id={element.AvatarName} onChange={() => this.handleOnChangeAvatar(element.Image)} />

                        <label className="avatarlabel" for={element.AvatarName}>
                            <img className="avatarImg" src={element.Image} /><br />
                            {element.AvatarName}
                        </label>
                    </li>
                )
            });
        }
        return (
            <div>
                <div className="navbar">
                    <ul>
                        <li><a className="name">Hi, {this.state.DisplayName}</a></li>
                        <div className="right">
                            <li ><a onClick={this.handleChangeAvatar}>Change Avatar</a></li>
                            <li ><a onClick={this.handleLogout}>Logout</a></li>
                        </div>
                    </ul>
                </div>
                <div className="authenticateform">
                    {/* <Grid>
                        <Row className="show-grid">
                            <Col xs={6} md={10}>
                                <h1>Hi, <br />
                                    {this.state.DisplayName}
                                </h1>
                            </Col>
                            <Col xs={6} md={2}>
                                <DropdownButton
                                    bsStyle='default'
                                    title='Setting'
                                    id={`dropdown-basic-setting`}
                                    className="dropdown-button"
                                >
                                    <MenuItem eventKey="1" onClick={this.handleChangeAvatar}>Change Avatar</MenuItem>
                                    <MenuItem eventKey="2"  >Logout</MenuItem>
                                </DropdownButton>
                            </Col>
                        </Row>
                    </Grid> */}

                    <QuizListComponent />
                    <QuizUserSummaryComponent />
                    <Modal dialogClassName="custom-modal" show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Select Avatar</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ul className="avatarul">
                                {rows}
                            </ul>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleConfirmSelection}>Confirm</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>);
    }
}

export default withRouter(ProfileComponent);