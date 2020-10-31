import React, { Component } from 'react';
import HelloWorldService from '../service/HelloWorldService';

class HelloRichardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            welcomeMessage: 'initial message',
            text: 'user text',
            counter: 55
        }
    }

    componentDidMount() {
        HelloWorldService.executeHelloWorldService()
            .then(response => this.setState({ welcomeMessage: response.data }))
            .catch(_err => this.setState({ welcomeMessage: 'Error Processing Request' }))
    }

    render() {
        return (<>
            <h1>Hello Richard Component</h1>
            <div className="container jt_welcome">
                {this.state.welcomeMessage}
            </div>
            <div className="container jt_counter">
                {this.state.counter}
            </div>
            <div className="container jt_copy">
                <input type="text" value={this.state.text} onChange={this.textChange} />
            </div>
            <div className="row jt_welcome">
                <button className="btn btn-success" onClick={this.copyText}>Copy Text</button>
            </div>
            <div className="row jt_counter">
                <button className="btn btn-success" onClick={this.increment}>Change Counter</button>
            </div>
        </>
        )
    }

    textChange = (event) => {
        this.setState({text: event.target.value});
    }

    increment = () => {
        this.setState({counter: this.state.counter + 3});
    }

    copyText = () => {
        this.setState({welcomeMessage: this.state.text});
    }
}

export default HelloRichardComponent