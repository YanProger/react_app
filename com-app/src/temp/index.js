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
                <Test testprop={'TEST'}/>
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


let serv = new  Server('http://192.168.0.93:8080');

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



// function calculateWinner(squares) {
//     const lines = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++) {
//         const [a, b, c] = lines[i];
//         if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//             return squares[a];
//         }
//     }
//     return null;
// }
//
// function botsMove(squares) {
//     let flag = true;
//     let rnd;
//     while (flag){
//         rnd = Math.round( getRandomArbitrary(0,9));
//         if (squares[rnd] === null || squares.filter(function (item) {
//                 return item === null
//             }).length === 0){
//             flag = false;
//         }
//     }
//     return rnd;
// }
//
// function getRandomArbitrary(min, max) {
//     return Math.random() * (max - min) + min;
// }
