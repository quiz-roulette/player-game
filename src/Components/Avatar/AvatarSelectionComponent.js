import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Server from '../API/server'
import './AvatarSelection.css'
import Alert from 'react-s-alert';

class AvatarSelectionComponent extends Component {
    constructor(props) {
        super(props);
        const { match: { params } } = props;
        this.handleOnChangeAvatar = this.handleOnChangeAvatar.bind(this);
        this.handleAvatarSelection = this.handleAvatarSelection.bind(this);

        this.state = {
            avatars: [],
            redirectURL: params.redirectURL,
            selectedAvatar: ""
        }

        Server.getAvatars().then((res) => {
            this.setState({
                avatars: res.data
            })
        })
    }

    handleAvatarSelection(event) {
        if(this.state.selectedAvatar == ""){
            Alert.error('must select atleast one avatar', {
                position: 'top-right',
                effect: 'slide',
                timeout: 'none'
            });
        }
        else{
            Server.updateUserAvatar(localStorage.getItem('u'),this.state.selectedAvatar).then((res) => {
                console.log(this.state.redirectURL);
                console.log("/"+this.state.redirectURL);
                this.props.history.push(decodeURIComponent("/"+this.state.redirectURL));
            })
        }
    }

    handleOnChangeAvatar(url){
        this.setState({
            selectedAvatar: url
        });
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
            <div className="avatarSelection">
                <h4>Select one of the below avatar:</h4>
                <br />
                <ul className="avatarul">
                    {rows}
                </ul>
                <br />
                <Button className="avatarSelectBtn" onClick={this.handleAvatarSelection}>Select</Button>
            </div>)
    }
}

export default AvatarSelectionComponent;