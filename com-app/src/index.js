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
class Button extends React.Component {
    render() {
        return (
            <div className="button" onClick={() => serv.increaseCookieCount()}>
            </div>
        );
    };
}
class SingIn extends React.Component {
    onSingInClick(){
        let name = document.getElementById('root').querySelector('.singinInput').value;
        serv.login(name)
    }
    render() {
        return (
            <div>
                <input className="singinInput" type="text" name="userName"/>
                <button className="singin" onClick={this.onSingInClick}>SingIn</button>
            </div>
        );
    }
}
class Main extends React.Component {
    render() {
        if (this.props.p.isLogin) {
            return (
                <div>
                    <Label value={this.props.p.val}/>
                    <Button/>
                    <Label value={this.props.p.title} />
                </div>
            );
        } else {
            return (
                <SingIn/>
            );
        }
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
        <Main p={params}/>,
        document.getElementById('root')
    );
}


let serv = new  Server('http://192.168.0.103:8080');
//let serv = new  Server('http://192.168.0.93:8080');

serv.xhttr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        let answer = JSON.parse(this.responseText);

        if (answer.code != null &&  answer.code === 0){
            if (answer.object.cc != null) {
                update( {
                    val: answer.object.cc,
                    title: answer.object.un ||  '',
                    isLogin: true
                });
            }
        } else if (answer.code === 1){
            update( {
                isLogin: false
            });
        }
    }
};


update({
    val: '0',
    title: '',
    isLogin: false
});
