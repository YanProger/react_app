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
            <div className={this.props.clss}  onClick={() => this.props.server[this.props.func]()}>
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
                <button className="singin" onClick={() => this.onSingInClick(this.props.server)}>Sign In</button>
            </div>
        );
    }
}

class OnlineList extends React.Component {
    render() {
        return (
            <div>
                <label className="onlineLabel">Joined users:</label>
                <ul className="onlineList">
                    {this.props.onlineusers
                        .sort((a, b) => a.ucc < b.ucc )
                        .map((currentValue)=> <li key={currentValue.uid}>{currentValue.name + '   ' + (currentValue.ucc || 0)}</li> )}
                </ul>
            </div>
        );
    }
}

class ErrorInform extends  React.Component {
    render() {
        return (
            <div className="blockScreen">
                <div className="Message">Cookie can't connect to server :(</div>
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
                    <Button clss="button" server={this.props.p.server} func='increaseCookieCount'/>
                    <Button clss="exitButton" server={this.props.p.server} func='logout'/>
                    <Label value={this.props.p.title}/>
                    <OnlineList onlineusers={this.props.p.users}/>
                </div>
            );
        }

        if (this.props.p.hasError) {
            return (
                <div>
                    <SingIn server={this.props.p.server}/>
                    <ErrorInform/>
                </div>
            );
        }

        return (
            <SingIn server={this.props.p.server}/>
        );
    }
}