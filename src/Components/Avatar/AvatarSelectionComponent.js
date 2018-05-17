import React,{Component} from 'react';
import {Button} from 'react-bootstrap';
import Server from '../API/server'
import './AvatarSelection.css'

class AvatarSelectionComponent extends Component{
    constructor(props){
        super(props);
        this.handleAvatarChange = this.handleAvatarChange.bind(this);
        this.state = {
            Avatars: []
        }

        Server.getAvatars().then((res) => {
            this.setState({
                Avatars: res.data
            })
        })
    }

    handleAvatarChange(event){
        alert(event.target.value);
    }

    render(){
        const avatars = [];
        
        for(var i=0; i<this.state.Avatars.length; i++){
            avatars.push(<label>
                <input type="radio" name="avatar" value={this.state.Avatars[i].Image} />
                <img src={this.state.Avatars[i].Image}/>
              </label>)
        }
        return(
        <div className="avatarSelection">
            <h4>Select one of the below avatar:</h4>
            <br/>
            <div onChange={this.handleAvatarChange}>
                {avatars}
            </div>
            <br/>
            <Button className="avatarSelectBtn">Select</Button>
        </div>)
    }
}

export default AvatarSelectionComponent;