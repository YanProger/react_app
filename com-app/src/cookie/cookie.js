import React from 'react'
import ReactDOM from 'react-dom'
import {Server} from './api'
import {Main} from "./front";

export class Cookie {
    constructor(){
        let self = this;
        self.users = [];
        self.serv = new Server('http://192.168.1.70:8080');
        self.serv.xhttr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let answer = JSON.parse(this.responseText);

                if (answer.code != null &&  answer.code === 0){
                    if (answer.object.cc != null) {
                        self._addNewUser(answer.object.un);
                        self._update( {
                            val: answer.object.cc,
                            title: answer.object.un ||  '',
                            isLogin: true
                        });
                    }
                } else if (answer.code === 1){
                    self._update( {
                        isLogin: false
                    });
                }
            }
        };
    }

    _update(params) {
        params.server = this.serv;
        params.users = this.users;
        ReactDOM.render(
            <Main p={params}/>,
            document.getElementById('root')
        );
    }

    _addNewUser(nurer) {
        let existUsrs = this.users.filter((item) => item === nurer);
        if (existUsrs.length === 0) {
            this.users.push(nurer);
        }
    }

    _refreshState(){
        let self = this;
        function wait() {
            window.setTimeout(checkCookieCount,500);
        }

        function checkCookieCount() {
            self.serv.checkCookieCount();
            wait();
        }

        wait();
    }

    Main (){
        this._update({
            isLogin: false
        });

        this._refreshState();
    }
}

