import React from 'react'
import ReactDOM from 'react-dom'
import './cookie.css'
import {Server} from './api'


class Label extends React.Component {
    render() {
        return (
            <div className="label">
                {this.props.value}
            </div>
        );
    }
}

class Test extends React.Component {
    render() {
        return (
            <div className="test">
                {this.props.testprop}
            </div>
        );
    }
}

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onClick: props.onClick
        }
    }


    render() {
        return (
            <div className="button" onClick={this.state.onClick}>
            </div>
        );
    };
}

class Main extends React.Component {
    inc() {
        serv.increaseCookieCount();
    }

    render() {
        return (
            <div>
                <Label value={this.props.value}/>
                <Button onClick={() => this.inc()}/>
                {/*<Test testprop={'TEST'}/>*/}
            </div>
        );
    }
}

function wait() {
    window.setTimeout(checkCookieCount,500);
}

function checkCookieCount() {
    serv.checkCookieCount();
    wait();
}

wait();


// ========================================

function update(params) {
    ReactDOM.render(
        <Main value={params.val}/>,
        document.getElementById('root')
    );
}


let serv = new  Server('http://localhost:8080');

serv.xhttr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        update({
            val: this.responseText
        });
    }
};


update({
    val: '0'
});
