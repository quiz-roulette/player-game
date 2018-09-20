import React, { Component } from 'react';
import { Button,Modal } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import './Common.css';
import { QuizListComponent } from '../index';
import Server from '../API/server'

class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleViewSchedule = this.handleViewSchedule.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
        this.handleConfirmSelection = this.handleConfirmSelection.bind(this);

        this.state = {
            show: false,
            avatars: [],
            selectedAvatarImage: ''
        }

        Server.getAvatars().then((res) => {
            this.setState({
                avatars: res.data
            })
        })
    }

    handleLogout(event){
        localStorage.clear();
        this.props.history.push("/account");
    }

    handleViewSchedule(event){
        this.props.history.push("/quizlist");
    }

    handleClose(event){
        this.setState({
            show: false
        })
    }

    handleChangeAvatar(event){
        this.setState({
            show: true
        })
    }

    handleOnChangeAvatar(image){
        this.setState({
            selectedAvatarImage: image
        })
    }

    handleConfirmSelection(event){
        if(this.state.selectedAvatarImage != ''){
            Server.updateUserAvatar(localStorage.getItem('u'),this.state.selectedAvatarImage).then((res) => {
                this.setState({
                    show: false
                })
            })
        }
    }

    render() {
        const rows = [];
        if(this.state.avatars.length > 0){
            this.state.avatars.forEach(element => {
                rows.push(
                    <li className="avatarli">
                        <input className="avatarinput" type='radio' value='1' name='radio' id={element.AvatarName} onChange={() => this.handleOnChangeAvatar(element.Image)}/>
                        
                        <label className="avatarlabel" for={element.AvatarName}>
                            <img src={element.Image}/><br/>
                            {element.AvatarName}
                        </label>
                    </li>
                )
            });
        }
        return (<div className="authenticateform">
        <Button className="logout-button" onClick={this.handleChangeAvatar}>Change Avatar</Button><Button className="logout-button" onClick={this.handleLogout}>Logout</Button>
        <h1>Hi, {localStorage.getItem('u')}</h1>
        <QuizListComponent/>
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
    </div>);
    }
}

export default withRouter(ProfileComponent);