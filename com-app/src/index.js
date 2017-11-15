import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Row extends React.Component {
    render(){
        return (
            <div className="row">
                {this.props.row.map((e, index) => <Cell key={index} value={e}/>)}
            </div>
        );
    }
}

class Cell extends React.Component {
    render(){
        return (
            <div className="cell">
                {this.props.value}
            </div>

        );
    }
}

class Table extends React.Component {
    render(){
        return (
            <div className="table">
                {this.props.table.map((e, index) => <Row key={index} row={e}/>)}
            </div>
        );
    }
}

let table = [];

let row1 = [];
row1.push("Fist");
row1.push("Second");
row1.push("Third");
row1.push("Four");

let row2 = [];
row2.push("Fist");
row2.push("Second");
row2.push("Third");
row2.push("Four");

let row3 = [];
row3.push("Fist");
row3.push("Second");
row3.push("Third");
row3.push("Four");

table.push(row1);
table.push(row2);
table.push(row3);


//--------------------------------


ReactDOM.render(
  <Table table={table}/>,
    document.getElementById('root')
);