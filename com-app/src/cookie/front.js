import React from 'react'
import './cookie.css'

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
            <div className="button" onClick={() => this.props.server.increaseCookieCount()}>
            </div>
        );
    };
}
class SingIn extends React.Component {
    onSingInClick(server){
        let name = document.getElementById('root').querySelector('.singinInput').value;
        server.login(name)
    }
    render() {
        return (
            <div>
                <input className="singinInput" type="text" name="userName"/>
                <button className="singin" onClick={() => this.onSingInClick(this.props.server)}>SingIn</button>
            </div>
        );
    }
}
export class Main extends React.Component {
    render() {
        if (this.props.p.isLogin) {
            return (
                <div>
                    <Label value={this.props.p.val}/>
                    <Button server={this.props.p.server}/>
                    <Label value={this.props.p.title} />
                </div>
            );
        } else {
            return (
                <SingIn server={this.props.p.server}/>
            );
        }
    }
}