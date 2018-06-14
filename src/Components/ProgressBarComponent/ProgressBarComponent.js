import React, { Component } from 'react'
import './ProgressBarComponent.css'

class ProgressBarComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="progressbar">
            <div className="progress" style={{ width: this.props.percentage + '%' }}>
                <img className="useravatar" src={
                    this.props.avatar ?
                        this.props.avatar :
                        "https://axperienceapp.azurewebsites.net/avatar/bee"} />
            </div>
        </div>);
    }
}

export default ProgressBarComponent;